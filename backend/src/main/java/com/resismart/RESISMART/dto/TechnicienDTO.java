package com.resismart.RESISMART.dto;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.resismart.RESISMART.models.Incident;
import com.resismart.RESISMART.models.Technicien;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TechnicienDTO {

    private Integer id;
    private String firstName;
    private String lastName;
    private String speciality;
    private String telephone;

    // Admin information
    private String adminFirstName;
    private String adminLastName;

    // List of incidents
    private List<IncidentDTO> incidents;

    // Constructor mapping Technicien to TechnicienDTO
    public TechnicienDTO(Technicien technicien) {
        this.id = technicien.getId();
        this.firstName = technicien.getFirstName();
        this.lastName = technicien.getLastName();
        this.speciality = technicien.getSpeciality();
        this.telephone = technicien.getTelephone();

        if (technicien.getAdmin() != null) {
            this.adminFirstName = technicien.getAdmin().getFirstName();
            this.adminLastName = technicien.getAdmin().getLastName();
        }

        if (technicien.getIncidents() != null) {
            this.incidents = technicien.getIncidents().stream()
                .map(IncidentDTO::new)
                .collect(Collectors.toList());
        }
    }

    // Nested DTO for incidents
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IncidentDTO {
        private String description;
        private Date dateAlert;
        private Date dateResolved;
        private String status;

        public IncidentDTO(Incident incident) {
            this.description = incident.getDescription();
            this.dateAlert = incident.getDateAlert();
            this.dateResolved = incident.getDateResolved();
            this.status = incident.getStatus();
        }
    }
}
