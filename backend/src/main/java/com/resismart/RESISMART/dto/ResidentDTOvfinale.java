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
public class ResidentDTOvfinale {
    

        private String cardNumber;
        private String expirationDate;
        private String cvv;
        private String cardHolderName;
    
        private String residentFirstName;
        private String residentLastName;
        private String residentUserName;
        private String residentTelephone;
        private String residentPassword;
        private String residentRoles;
        private Date residentDate;
    }
    