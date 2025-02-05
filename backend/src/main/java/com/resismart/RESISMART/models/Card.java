package com.resismart.RESISMART.models;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Utilisez IDENTITY si AUTO pose problème
    @Column(nullable = false)
    private Integer id;

    private String cardNumber;

    private String cardHolderName;

    private String expirationDate;

    private String cvv; 

    @ManyToOne
    @JoinColumn(name = "resident_id")
    private Resident resident;

}
