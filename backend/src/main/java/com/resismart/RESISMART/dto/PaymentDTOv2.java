package com.resismart.RESISMART.dto;

import java.sql.Date;

import com.resismart.RESISMART.models.Payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTOv2 {

    private Integer id;
    private Double amount;
    private String status;
    private Date datePayment;
    private Boolean isSet;
    private Integer residentId;
}