package com.resismart.RESISMART.models;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chambre")
public class Chambre implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Utilisez IDENTITY si AUTO pose problème
    @Column(nullable = false)
    private Integer id;

    @Column(unique = true)
    private Integer number;

    @Column(nullable = false, length = 50) // Limite la longueur à 50 caractères
    private String type;

    private String status;

    private Double price;

    private Integer numberResidentPossible;

    private Integer numberCurent;


    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
    
    @OneToMany(mappedBy = "chambre", cascade = CascadeType.ALL)
    private List<Resident> residents;

    @OneToMany(mappedBy = "chambre", cascade = CascadeType.ALL)
    private List<Incident> incidents;

    @OneToMany(mappedBy = "chambre", cascade = CascadeType.ALL)
    private List<Notification> notifications;

}
