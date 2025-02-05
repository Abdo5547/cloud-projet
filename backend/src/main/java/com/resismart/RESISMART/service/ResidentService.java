package com.resismart.RESISMART.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.resismart.RESISMART.auth.models.AdminDetails;
import com.resismart.RESISMART.auth.models.ResidentDetails;
import com.resismart.RESISMART.dto.ResidentDTO;
import com.resismart.RESISMART.dto.ResidentDTOvfinale;
import com.resismart.RESISMART.dto.chambredto.ChambreDTO;
import com.resismart.RESISMART.dto.residentdto.CardDTO;
import com.resismart.RESISMART.dto.residentdto.IncidentResidentDTO;
import com.resismart.RESISMART.dto.residentdto.ResidentInfoDTO;
import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Card;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.models.Incident;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.repository.CardRepository;
import com.resismart.RESISMART.repository.ResidentRepository;

@Service
public class ResidentService implements UserDetailsService {

    @Autowired
    private ResidentRepository residentRepository;


     @Override
    public ResidentDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Optional<Resident> resident = residentRepository.findMyUsersByUserName(userName);

        resident.orElseThrow(() -> new UsernameNotFoundException(userName + " not found."));

        return resident.map(ResidentDetails::new).get();
    }

    // Créer un résident
    public Resident createResident(Resident resident) {
        return residentRepository.save(resident);
    }


    // Obtenir un résident par ID
    public Optional<Resident> getResidentById(Integer residentId) {
        return residentRepository.findById(residentId);
    }

    public Optional<Resident> getResidentByUserName(String userName) {
        return residentRepository.findMyUsersByUserName(userName);
    }





    // Mettre à jour un résident
    public Resident updateResident(Integer residentId, Resident residentDetails) {
        Resident resident = residentRepository.findById(residentId).orElseThrow();
        resident.setFirstName(residentDetails.getFirstName());
        resident.setLastName(residentDetails.getLastName());
        resident.setUserName(residentDetails.getUserName());
        resident.setTelephone(residentDetails.getTelephone());
      //  resident.setAdministrateur(residentDetails.getAdministrateur());
      //  resident.setChambre(residentDetails.getChambre());
      //  resident.setPaiements(residentDetails.getPaiements());
        return residentRepository.save(resident);
    }

    // Supprimer un résident
    public void deleteResident(Integer residentId) {
        Resident resident = residentRepository.findById(residentId).orElseThrow();
        residentRepository.delete(resident);
    }



     public ResidentDTO convertToDTO(Resident resident) {
        ResidentDTO dto = new ResidentDTO();
        dto.setId(resident.getId());
        dto.setFirstName(resident.getFirstName());
        dto.setLastName(resident.getLastName());
        dto.setUserName(resident.getUserName());
        dto.setTelephone(resident.getTelephone());
        dto.setRoles(resident.getRoles());
        dto.setDate(resident.getDate());
        dto.setActive(resident.isActive());

        // Extraire uniquement le numéro de chambre
        if (resident.getChambre() != null) {
            dto.setChambreNumber(resident.getChambre().getNumber());
        }

        return dto;
    }

    public List<ResidentDTO> convertToDTOList(List<Resident> residents) {
        return residents.stream().map(this::convertToDTO).collect(Collectors.toList());
    }





    public ResidentInfoDTO getResidentDetails(Integer residentId) {
        Optional<Resident> residentOpt = residentRepository.findById(residentId);
        if (!residentOpt.isPresent()) {
            return null; // ou gérer une exception
        }

        Resident resident = residentOpt.get();
        ResidentInfoDTO residentDTO = new ResidentInfoDTO();

        // Mapper les informations simples
        residentDTO.setId(resident.getId());
        residentDTO.setFirstName(resident.getFirstName());
        residentDTO.setLastName(resident.getLastName());
        residentDTO.setUserName(resident.getUserName());
        residentDTO.setTelephone(resident.getTelephone());
        residentDTO.setActive(resident.isActive());

        // Mapper les incidents
        List<IncidentResidentDTO> incidentDTOList = new ArrayList<>();
        for (Incident incident : resident.getIncidents()) {
            IncidentResidentDTO incidentDTO = new IncidentResidentDTO();
            incidentDTO.setDescription(incident.getDescription());
            incidentDTO.setDateAlert(incident.getDateAlert());
            incidentDTO.setDateResolved(incident.getDateResolved());
            incidentDTO.setStatus(incident.getStatus());
            incidentDTO.setFirstNameTechnicien(incident.getTechnicien().getFirstName());
            incidentDTO.setLastNameTechnicien(incident.getTechnicien().getLastName());
            incidentDTOList.add(incidentDTO);
        }
 
        residentDTO.setIncidents(incidentDTOList);






        List<CardDTO> cardDTOList = new ArrayList<>();
        for (Card card : resident.getCards()) {
            CardDTO cardDTO = new CardDTO();
            cardDTO.setId(card.getId());        
            cardDTO.setCardNumber(card.getCardNumber());
            cardDTO.setCardHolderName(card.getCardHolderName());
            cardDTO.setExpirationDate(card.getExpirationDate());
            cardDTO.setCvv(card.getCvv());
           
        }
 
        residentDTO.setCards(cardDTOList);

        // Mapper les informations de la chambre
        Chambre chambre = resident.getChambre();
        if (chambre != null) {
            ChambreDTO chambreDTO = new ChambreDTO();
            chambreDTO.setId(chambre.getId());
            chambreDTO.setNumber(chambre.getNumber());
            chambreDTO.setType(chambre.getType());
            chambreDTO.setStatus(chambre.getStatus());
            chambreDTO.setPrice(chambre.getPrice());
            residentDTO.setChambre(chambreDTO);
        }

        return residentDTO;
    }




 @Autowired
    private CardRepository cardRepository;




    public Resident saveResident(ResidentDTOvfinale residentDTO) {
        // Créer l'entité Resident à partir du DTO
        Resident resident = new Resident();
        resident.setFirstName(residentDTO.getResidentFirstName());
        resident.setLastName(residentDTO.getResidentLastName());
        resident.setUserName(residentDTO.getResidentUserName());
        resident.setTelephone(residentDTO.getResidentTelephone());
        resident.setPassword(residentDTO.getResidentPassword());
        resident.setRoles(residentDTO.getResidentRoles());
        resident.setDate(residentDTO.getResidentDate());
        resident.setActive(true);  // Par défaut, un résident est actif

        // Enregistrer le résident dans la base de données
        resident = residentRepository.save(resident);

        // Créer l'entité Card à partir du DTO
        Card card = new Card();
        card.setCardNumber(residentDTO.getCardNumber());
        card.setExpirationDate(residentDTO.getExpirationDate());
        card.setCvv(residentDTO.getCvv());
        card.setCardHolderName(residentDTO.getCardHolderName());
        card.setResident(resident);

        // Enregistrer la carte dans la base de données
        cardRepository.save(card);

        return resident;
    }


}
