package com.resismart.RESISMART.models;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "incident")
public class Incident implements Serializable  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    private String description;

    private Date dateAlert;

    private Date dateResolved;

    private String status;

    private Boolean isResolved;

    @ManyToOne
    @JoinColumn(name = "chambre_id")
    private Chambre chambre;


    @ManyToOne
    @JoinColumn(name = "technicien_id")
    private Technicien technicien;


    @ManyToOne
    @JoinColumn(name = "resident_id")
    private Resident resident;


}
