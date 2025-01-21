package com.filter.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "OZELLIK_2")
public class Ozellik_2 extends BaseOzellik {
    // Şu an ek kolon yok, sadece BaseOzellik’ten miras alıyor.
    // Ozellik_2, Ozellik_3... da benzer şekilde yazılacak
}
