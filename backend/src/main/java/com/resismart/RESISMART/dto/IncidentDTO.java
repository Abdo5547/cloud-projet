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
public class IncidentDTO {

    private Integer id;
    private String description;
    private Date dateAlert;
    private Date dateResolved;


}
