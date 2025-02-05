package com.resismart.RESISMART.dto.chambredto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ChambreDTO {
    private Integer id;
    private Integer number;
    private String type;
    private String status;
    private Integer numberResidentPossible;
    private Integer numberCurent;
    private Double price;
    private List<InciDTO> incidents;
    private List<ResDTO> residents;
    
}
