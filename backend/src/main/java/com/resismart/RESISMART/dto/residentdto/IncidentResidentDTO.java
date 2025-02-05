package com.resismart.RESISMART.dto.residentdto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class IncidentResidentDTO {

    private String description;
    private Date dateAlert;
    private Date dateResolved;
    private String status;
    private String firstNameTechnicien;
    private String lastNameTechnicien;

}
