package com.resismart.RESISMART.models;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment")
public class Payment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Double amount;

    private String status;

    private Date datePayment;

    private Boolean isSet;

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident;
    
 

    public void markAsPaid() {
        this.status = "Paid";
        this.isSet = true;
        
    }
}
