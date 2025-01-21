package com.filter.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "OZELLIK_4")
public class Ozellik_4 extends BaseOzellik {
    // Şu an ek kolon yok, sadece BaseOzellik’ten miras alıyor.
    // Ozellik_2, Ozellik_3... da benzer şekilde yazılacak
}
