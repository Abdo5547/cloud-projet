package com.resismart.RESISMART.mapper;

import com.resismart.RESISMART.dto.IncidentDtoV1;
import com.resismart.RESISMART.models.Incident;

public class IncidentMapper {

    public static IncidentDtoV1 toDto(Incident incident) {
        if (incident == null) {
            return null;
        }

        return new IncidentDtoV1(
                incident.getId(),
                incident.getDescription(),
                incident.getDateAlert(),
                incident.getDateResolved(),
                incident.getStatus(),
                incident.getIsResolved(),
                incident.getChambre() != null ? incident.getChambre().getNumber() : null,
                incident.getTechnicien() != null ? incident.getTechnicien().getFirstName() : null,
                incident.getTechnicien() != null ? incident.getTechnicien().getLastName() : null
        );
    }

    
}
