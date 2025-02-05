package com.resismart.RESISMART.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidentDtoV1 {
    private Integer id;
    private String description;
    private Date dateAlert;
    private Date dateResolved;
    private String status;
    private Boolean isResolved;

    private Integer chambreNumber; // Propriété de la chambre
    private String technicienFirstName; // Prénom du technicien
    private String technicienLastName;  // Nom du technicien
}
