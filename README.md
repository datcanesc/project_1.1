# README

## Proje Hakkında
Bu proje, aşağıda açıklanan tablo yapıları ve özellikler baz alınarak geliştirilmiştir. Proje, arayüz üzerinden gönderilen verilerin işlenmesi ve belirli SQL sorgularının çalıştırılması ile çalışmaktadır.

### Kullanılan Tablolar

#### **MAIN_TABLE**
Projedeki filtreleme işlemlerinin tamamı MAIN_TABLE üzerinden gerçekleşmektedir.

- **ITEM_NAME**: Arayüzden gönderilen item ismini tutar. (Tip: `STRING`)
- **COLUMN1**: Rasgele bir veri kolonudur. (Tip: `STRING`)
- **TARIH**: Tarih bilgilerini tutar. Format: `YYYY-MM-DD hh:mm:ss`. (Tip: `DATE`)
- **PARAMETER1**, **PARAMETER2**, **PARAMETER3**: ITEM4 için kullanılan parametreler bu alanlarda tutulur. (Tip: `STRING`)

#### **OZELLIK Tabloları**
Bu tablolar, **BaseOzellik.java** sınıfını genişleterek oluşturulmuştur. Bu sayede:
- Her bir **Ozellik** tablosunun kolonları ortak bir yapıdan türetilir.
- Eklenmek istenen özel kolonlar, ilgili **Ozellik** tablosunun kendi `entity` dosyasına eklenebilir.

Tablonun temel kolonları şunlardır:
- **ID**: Birincil anahtar.
- **NAME**: Özellik ismini tutar. (Tip: `STRING`)

### Backend Detayları
- Backend ile iletişim sırasında kullanılan SQL sorguları, `/backend/src/main/resources/queries.properties` dosyasında tanımlanmıştır.
- **queries.properties** dosyasında:
  - Sorgular içerisinde kullanılan parametreler, arayüzden gelen verilerle doldurulup çalıştırılmaktadır.
  - Dosyanın "Değişkenler" alanında tablo isimleri ve schema yeniden tanımlanabilir.

### Düzenlenmesi Gerekebilecek Dosyalar

1. **MainTable.java**
   - Projedeki filtreleme işlemlerinin büyük bir kısmı bu tablo üzerinden gerçekleşmektedir. Bu sebeple bu tablodaki kolonları elinizdeki veri yapısına göre güncellemeniz önerilir.
   - Eğer ikincil ve yeni bir tablo eklenirse `queries.properties` dosyasından sorguları isteklerinize göre düzenleyebilirsiniz.

2. **BaseOzellik.java**
   - Tüm Ozellik tablolarının temel sınıfıdır. Ortak kolonları ve yapıları içerir. Proje yapılırken tüm özellik tabloları tek tip olarak varsayılmıştır.
   - Tüm özelliklere ortak olarak eklenmek istenen kolonlar `BaseOzellik.java` dosyası içerisinden eklenebilir.
   - Eğer belirli bir özellik tablosunu güncellemek isterseniz, ilgili `Ozellik_X.java` dosyası içerisinde eklemeler yapabilirsiniz.

3. **queries.properties**
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

Eğer docker containerlarının ismi veya portu değiştirilirse frontend/src dosyası içerisinden proxy alanında ki url yeniden düzenlenmelidir.

# Projenin Çalıştırılması


```properties
docker compose up --build
```

yukarıdaki docker compose komut satırı ile backend frontend ve oracle db containerları çalıştırılacaktır.