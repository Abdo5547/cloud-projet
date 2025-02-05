package com.resismart.RESISMART.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TechnicienRequestDTO {

    private String firstName;
    private String lastName;
    private String speciality;  // Modifier pour correspondre à 'speciality' dans Technicien
    private String telephone;
    private Long adminId; // ID de l'admin

}
