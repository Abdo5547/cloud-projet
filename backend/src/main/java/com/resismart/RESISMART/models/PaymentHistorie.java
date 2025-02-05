package com.resismart.RESISMART.models;

import java.io.Serializable;
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
@Table(name = "payment_historie")
public class PaymentHistorie implements Serializable  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Utilisez IDENTITY si AUTO pose problème
    @Column(nullable = false)
    private Integer id;

    private Date datePayment;

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident;
    
    

    
}
