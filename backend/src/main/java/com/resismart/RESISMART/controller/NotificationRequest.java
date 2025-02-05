package com.resismart.RESISMART.controller;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class NotificationRequest {

    private String userName;  // Le nom d'utilisateur du résident
    private String chambreType; // Le type de la chambre (par exemple, "VipRoom")
    private String status;  // Le statut de la notification
    private Date date;  // La date de la notification
}
