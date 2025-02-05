package com.resismart.RESISMART.mapper;

import com.resismart.RESISMART.dto.AdminDTO;
import com.resismart.RESISMART.models.Admin;

public class AdminMapper {

    public static AdminDTO toDTO(Admin admin) {
        return new AdminDTO(
                admin.getId(),
                admin.getFirstName(),
                admin.getLastName(),
                admin.getTelephone(),
                admin.getUserName(),
                admin.getCountry(),
                admin.isActive()
        );
    }
}