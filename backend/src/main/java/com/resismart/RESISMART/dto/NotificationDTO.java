package com.resismart.RESISMART.dto;

import java.sql.Date;

import com.resismart.RESISMART.models.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {

    private Integer id;
    private Date date;
    private String status;

    // Informations du résident
    private String residentFirstName;
    private String residentLastName;
    private String residentTelephone;
    private String residentUserName;
    private Integer residentId;



    // Informations de la chambre
    private Integer chambreNumber;
    private Integer chambreId;


    // Constructeur qui mappe une Notification à un NotificationDTO
    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.date = notification.getDate();
        this.status = notification.getStatus();

        if (notification.getResident() != null) {
            this.residentFirstName = notification.getResident().getFirstName();
            this.residentLastName = notification.getResident().getLastName();
            this.residentTelephone = notification.getResident().getTelephone();
            this.residentUserName = notification.getResident().getUserName();
            this.residentId = notification.getResident().getId();   
        }

        if (notification.getChambre() != null) {
            this.chambreNumber = notification.getChambre().getNumber();
            this.chambreId = notification.getChambre().getId();

              // Assurez-vous que 'getNumber' existe dans la classe Chambre
        }
    }
}