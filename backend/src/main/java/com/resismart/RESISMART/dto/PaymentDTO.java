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
public class PaymentDTO {

    private Integer id;
    private Double amount;
    private Date date;
    private String status;
    private Date datePayment;
    private Boolean isSet;

    private String residentUserName;
    private String residentFirstName;
    private String residentLastName;
    private String residentTelephone;


    // Constructeur qui mappe un Payment à un PaymentDTO
    public PaymentDTO(Payment payment) {
        this.id = payment.getId();
        this.amount = payment.getAmount();
        this.status = payment.getStatus();
        this.datePayment = payment.getDatePayment();
        this.isSet = payment.getIsSet();

        if (payment.getResident() != null) {
            this.residentUserName = payment.getResident().getUserName();
            this.residentFirstName = payment.getResident().getFirstName();
            this.residentLastName = payment.getResident().getLastName();
            this.residentTelephone = payment.getResident().getTelephone();
        }
    }
}
