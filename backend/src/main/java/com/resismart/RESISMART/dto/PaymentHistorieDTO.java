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
public class PaymentHistorieDTO {

    private Integer id;
    private Date datePayment;
    private ResidentDTO resident;

}