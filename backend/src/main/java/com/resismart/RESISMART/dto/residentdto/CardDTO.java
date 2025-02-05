package com.resismart.RESISMART.dto.residentdto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CardDTO {

    private Integer id;

    private String cardNumber;

    private String cardHolderName;

    private String expirationDate;

    private String cvv; 
    
}
