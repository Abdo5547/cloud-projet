package com.resismart.RESISMART.dto.residentdto;

import java.util.List;


import com.resismart.RESISMART.dto.chambredto.ChambreDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ResidentInfoDTO {

    private Integer id;
    private String firstName;
    private String lastName;
    private String userName;
    private String telephone;
    private boolean active;

    private List<IncidentResidentDTO> incidents;
    private List<CardDTO> cards;

    private ChambreDTO chambre;

}
