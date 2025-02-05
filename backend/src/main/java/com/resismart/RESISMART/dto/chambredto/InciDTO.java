package com.resismart.RESISMART.dto.chambredto;


import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class InciDTO {

    private String description;
    private Date dateAlert;
    private Date dateResolved;
    private String status;
    private String firstNameTechnicien;
    private String lastNameTechnicien;
}
