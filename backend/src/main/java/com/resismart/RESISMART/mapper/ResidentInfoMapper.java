package com.resismart.RESISMART.mapper;

import com.resismart.RESISMART.dto.residentdto.IncidentResidentDTO;
import com.resismart.RESISMART.dto.residentdto.ResidentInfoDTO;
import com.resismart.RESISMART.dto.chambredto.ChambreDTO;
import com.resismart.RESISMART.dto.chambredto.InciDTO;
import com.resismart.RESISMART.dto.chambredto.ResDTO;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.models.Payment;

import java.util.List;
import java.util.stream.Collectors;

public class ResidentInfoMapper {

    // Méthode pour mapper un Resident vers ResidentInfoDTO
    public static ResidentInfoDTO toDTO(Resident resident) {
        if (resident == null) {
            return null;
        }

        ResidentInfoDTO dto = new ResidentInfoDTO();
        dto.setId(resident.getId());
        dto.setFirstName(resident.getFirstName());
        dto.setLastName(resident.getLastName());
        dto.setUserName(resident.getUserName());
        dto.setTelephone(resident.getTelephone());
        dto.setActive(resident.isActive());

        // Mapper les incidents
        List<IncidentResidentDTO> incidentDTOs = resident.getChambre() != null
                ? resident.getChambre().getIncidents().stream().map(incident -> {
                    IncidentResidentDTO inciDTO = new IncidentResidentDTO();
                    inciDTO.setDescription(incident.getDescription());
                    inciDTO.setDateAlert(incident.getDateAlert());
                    inciDTO.setDateResolved(incident.getDateResolved());
                    inciDTO.setStatus(incident.getStatus());

                    if (incident.getTechnicien() != null) {
                        inciDTO.setFirstNameTechnicien(incident.getTechnicien().getFirstName());
                        inciDTO.setLastNameTechnicien(incident.getTechnicien().getLastName());
                    }

                    return inciDTO;
                }).collect(Collectors.toList())
                : null;
        dto.setIncidents(incidentDTOs);

        // Mapper la chambre
        Chambre chambre = resident.getChambre();
        if (chambre != null) {
            ChambreDTO chambreDTO = new ChambreDTO();
            chambreDTO.setId(chambre.getId());
            chambreDTO.setNumber(chambre.getNumber());
            chambreDTO.setType(chambre.getType());
            chambreDTO.setStatus(chambre.getStatus());
            chambreDTO.setNumberResidentPossible(chambre.getNumberResidentPossible());
            chambreDTO.setNumberCurent(chambre.getNumberCurent());
            chambreDTO.setPrice(chambre.getPrice());

            // Ajouter les incidents de la chambre
            List<InciDTO> chambreIncidents = chambre.getIncidents().stream().map(incident -> {
                InciDTO inciDTO = new InciDTO();
                inciDTO.setDescription(incident.getDescription());
                inciDTO.setDateAlert(incident.getDateAlert());
                inciDTO.setDateResolved(incident.getDateResolved());
                inciDTO.setStatus(incident.getStatus());

                if (incident.getTechnicien() != null) {
                    inciDTO.setFirstNameTechnicien(incident.getTechnicien().getFirstName());
                    inciDTO.setLastNameTechnicien(incident.getTechnicien().getLastName());
                }

                return inciDTO;
            }).collect(Collectors.toList());
            chambreDTO.setIncidents(chambreIncidents);

            // Ajouter les résidents de la chambre
            List<ResDTO> chambreResidents = chambre.getResidents().stream().map(res -> {
                ResDTO resDTO = new ResDTO();
                resDTO.setFirstNameResident(res.getFirstName());
                resDTO.setLastNameResident(res.getLastName());
                resDTO.setTelephone(res.getTelephone());
                resDTO.setId(res.getId());

                // Déterminer le statut du paiement
                String statusPayment = "Paid";
                for (Payment payment : res.getPaiements()) {
                    if (Boolean.TRUE.equals(payment.getIsSet())) {
                        statusPayment = "PendingPayment";
                    } else if ("LatePayment".equals(payment.getStatus())) {
                        statusPayment = "LatePayment";
                    }
                }
                resDTO.setStatusPayment(statusPayment);

                return resDTO;
            }).collect(Collectors.toList());
            chambreDTO.setResidents(chambreResidents);

            dto.setChambre(chambreDTO);
        }

        return dto;
    }
}
