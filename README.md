# README

## Proje Hakkında
Bu proje, kullanıcıların arayüz üzerinden belirledikleri kriterlere göre verileri filtreleyip, filtrelenmiş verileri Excel formatında dışa aktarmalarına olanak tanır. Proje, OracleDB, Spring Boot, Trino ve React teknolojileri kullanılarak geliştirilmiştir. İş akışı şu şekilde işlemektedir: Arayüzden gelen filtreleme istekleri doğrultusunda SQL sorguları oluşturulur, bu sorgular Trino'ya iletilir ve sonuçlar OracleDB üzerinde işlenir.


### Kullanılan Tablolar

#### **MAIN_TABLE**
Projedeki filtreleme işlemlerinin tamamı MAIN_TABLE üzerinden gerçekleşmektedir.

- **ITEM_NAME**: Arayüzden gönderilen item ismini tutar. (Tip: `STRING`)
- **COLUMN1**: Rasgele bir veri kolonudur. (Tip: `STRING`)
- **TARIH**: Tarih bilgilerini tutar. Format: `YYYY-MM-DD hh:mm:ss`. (Tip: `DATE`)
- **PARAMETER1**, **PARAMETER2**, **PARAMETER3**: ITEM4 için kullanılan parametreler bu alanlarda tutulur. (Tip: `STRING`)

#### **OZELLIK Tabloları**

Tablonun temel kolonları şunlardır:
- **ID**: Birincil anahtar.
- **NAME**: Özellik ismini tutar. (Tip: `STRING`)

#### **TABLE_NAME_LIST**

Tablo daha önce oluşturulan tabloların isimlerini tutar.

### Backend Detayları
- Backend ile iletişim sırasında kullanılan SQL sorguları, `/backend/src/main/resources/queries.properties` dosyasında tanımlanmıştır.
- **queries.properties** dosyasında:
  - Sorgular içerisinde kullanılan parametreler, arayüzden gelen verilerle doldurulup çalıştırılmaktadır.
  - Dosyanın "Değişkenler" alanında tablo isimleri , catalog ve schema yeniden tanımlanabilir.

### Düzenlenmesi Gerekebilecek Dosyalar

1. **queries.properties** (`/backend/src/main/resources/queries.properties`)
   - SQL sorgularını ve projeye özel parametreleri tanımlar.
   - Sorgular verilen yönergeye göre isimlendirilmiştir. Kullanılan tablo isimleri "Değişkenler" satırı altında tanımlanmıştır. `Entity` dosyalarında yapılan değişikliklere göre tablo isimleri yeniden isimlendirilebilir.
   - `sql_ozellikX` türünde olan sorgular zincirleme `JOIN` sorgusu yapmak için kullanılmaktadır.
   - `sqlX` türünde olan sorgular yapılan filtrelere göre ilk tabloyu oluşturur.
   - Bu sorgulardan `sql1`, `sql2` ve `sql3` sorguları parametre olarak `ITEM_NAME` değişkenini alır.


#### Örnek sql1 sorgusu
```properties
# queries.properties Örnekleri
sql1=CREATE TABLE temp_table_20241230 AS SELECT * FROM SYS.MAIN_TABLE WHERE ITEM_NAME = 'item1'
```

## .env dosyası
Veritabanına bağlanmak için gerekli ayarlarda bu dosya içerisinden yapılmalıdır.

Eğer backend containerının servis ismi veya portu değiştirilirse frontend/package.json dosyası içerisinden proxy alanında ki url yeniden düzenlenmelidir. 
 **"proxy": "http://BackendContainerServiceName:BackendContainerPort/",**

 **trino**(`/trino/config/catalog/oracle.properties`)
   - Bu dosyada yapılan değişiklikler ile bağlanılacak databasenin ayarları yapılır.
   - connection-url = veri tabanı url
   - connection-user = veri  tabanı kullanıcısı
   - connection-password = veri tabanı schema şifresi

# Projenin Çalıştırılması

### Gereksinimler
JDK version 21 kullanılmaktadır.
- **java versiyonunu kontrol etmek için** 
```properties
java -version
```

- SNAPSHOT olmadan backendle ilgili işlemler yapılamaz. Sonrasında backend kodlarında bir değişiklik yapılırsa yeniden bu kod çalıştırılıp SNAPSHOT dosyası güncellenmelidir. /backend klasörü içerisinde gidin.
- **SNAPSHOT oluşturmak için** 
```properties
mvn clean install
```
Bu adımdan sonra /backend/target/backend-0.0.1-SNAPSHOT.jar yolunda bir dosya oluşturulacaktır

## Docker Network Oluşturulması
Öncelikle containerların birbiri ile iletişimde olabilmesi için bir network oluşturulmalıdır. Bu proje için aşağıda örnek bir network olluşturma kodu verilmiştir. İsteğe bağlı olarak network ismi değiştirilebilir ancak docke-compose dosyaları içerisinden de bu isim güncellenmelidir.

```properties
docker network create my-shared-network
```
## Trino (/trino) port:8088
Projeyi daha önceden elinizde bulunan bir Trino'ya bağlamak isterseniz oracle.properties dosyasından değişiklikleri yapmalısınız.
Ancak elinizde bir Trino bulunmamaktaysa dosya içerisindeki trino klasörü içerisinde gidip aşağıdaki kodu çalıştırmanız gerekir.
Bu kod trino'yu docker içerisinde kuracaktır.
```properties
docker compose up --build
```


## Database (/db)
Projeyi daha önceden elinizde bulunan bir Oracle db'ye bağlamak isterseniz env dosyasından değişiklikleri yapmalısınız.
Ancak elinizde bir Oracle db bulunmamaktaysa dosya içerisindeki db klasörü içerisinde gidip aşağıdaki kodu çalıştırmanız gerekir.
Bu kod Oracle db latest versiyonunu docker içerisinde kuracaktır.
```properties
docker compose up --build
```


## Frontend ve Backend
Projenin ana dizininde bulunurken bu kodu çalıştırınız.
```properties
docker compose up --build
```

yukarıdaki docker compose komut satırı ile backend frontend containerları çalıştırılacaktır.


### Qureis
queries.properties dosyasının değiştirilmesi halinde sorgular doğru şekilde aktarılıyor mu kontrol etmek için 
/queries/all endpointine GET isteği atılmalıdır.