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
@Table(name = "resident")
public class Resident implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Utilisez IDENTITY si AUTO pose problème
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false, length = 50) // Limite la longueur à 50 caractères
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(unique = true, nullable = false, length = 50) // Ajout de "nullable = false"
    private String userName;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(length = 15) // Transformez en String si nécessaire pour les numéros longs
    private String telephone;

    @Column(length = 15) // Transformez en String si nécessaire pour les numéros longs
    private Date date;

    @Column(nullable = false, length = 50) // Définissez une longueur raisonnable
    private String roles;

    private boolean active;

    @ManyToOne
    @JoinColumn(name = "chambre_id")
    private Chambre chambre;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @OneToMany(mappedBy = "resident", cascade = CascadeType.ALL)
    private List<Payment> paiements;

    @OneToMany(mappedBy = "resident", cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @OneToMany(mappedBy = "resident", cascade = CascadeType.ALL)
    private List<Incident> incidents;

    @OneToMany(mappedBy = "resident", cascade = CascadeType.ALL)
    private List<Card> cards;


}
