package com.resismart.RESISMART.dto;


import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResidentDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String userName;
    private String telephone;
    private String roles;
    private boolean active;
    private Date date;
    private Integer chambreNumber; // Pour inclure uniquement le numéro de la chambre
}
