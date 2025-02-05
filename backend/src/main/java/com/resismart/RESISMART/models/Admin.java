package com.resismart.RESISMART.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "admin")

public class Admin  implements Serializable  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    private String firstName;

    private String lastName;

    private Integer telephone; 

    @Column(nullable = false, unique = true)
    private String userName;

    private String password;

    private String roles;

    private String country;

    private boolean active;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Chambre> chambres;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Resident> residents;


    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Technicien> techniciens;
}




