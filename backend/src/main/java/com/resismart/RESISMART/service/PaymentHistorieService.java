package com.resismart.RESISMART.service;

import com.resismart.RESISMART.dto.PaymentHistorieDTO;
import com.resismart.RESISMART.dto.ResidentDTO;
import com.resismart.RESISMART.models.PaymentHistorie;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.repository.PaymentHistorieRepository;
import com.resismart.RESISMART.repository.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentHistorieService {

    @Autowired
    private PaymentHistorieRepository paymentHistorieRepository;

    @Autowired
    private ResidentRepository residentRepository;

    // Récupérer l'historique des paiements d'un résident par son ID
    public List<PaymentHistorieDTO> getPaymentHistorieByResidentId(Integer residentId) {
        // Chercher le résident par son ID
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        // Chercher tous les paiements associés à ce résident
        List<PaymentHistorie> paymentHistorieList = paymentHistorieRepository.findByResident(resident);

        // Mapper les paiements en PaymentHistorieDTO
        return paymentHistorieList.stream().map(payment -> {
            PaymentHistorieDTO dto = new PaymentHistorieDTO();
            dto.setId(payment.getId());
            dto.setDatePayment(payment.getDatePayment());
            
            // Mapper le résident en ResidentDTO
            ResidentDTO residentDTO = new ResidentDTO();
            residentDTO.setId(resident.getId());
            residentDTO.setFirstName(resident.getFirstName());
            residentDTO.setLastName(resident.getLastName());
            residentDTO.setUserName(resident.getUserName());
            residentDTO.setTelephone(resident.getTelephone());
            residentDTO.setRoles(resident.getRoles());
            residentDTO.setActive(resident.isActive());
            residentDTO.setDate(resident.getDate());

            // Ajouter le numéro de chambre
            if (resident.getChambre() != null) {
                residentDTO.setChambreNumber(resident.getChambre().getNumber());
            }

            dto.setResident(residentDTO);
            return dto;
        }).collect(Collectors.toList());
    }
}
