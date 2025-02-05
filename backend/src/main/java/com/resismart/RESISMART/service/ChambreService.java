package com.resismart.RESISMART.service;

import com.resismart.RESISMART.auth.AdminRepository;
import com.resismart.RESISMART.dto.chambredto.ChambreDTO;
import com.resismart.RESISMART.dto.chambredto.InciDTO;
import com.resismart.RESISMART.dto.chambredto.ResDTO;
import com.resismart.RESISMART.dto.chambredto.TechDTO;
import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.models.Incident;
import com.resismart.RESISMART.models.Payment;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.models.Technicien;
import com.resismart.RESISMART.repository.ChambreRepository;
import com.resismart.RESISMART.repository.IncidentRepository;
import com.resismart.RESISMART.repository.PaymentRepository;
import com.resismart.RESISMART.repository.ResidentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class ChambreService {

    @Autowired
    private ChambreRepository chambreRepository;

      @Autowired
    private PaymentRepository paymentRepository;

    // Trouver une chambre par son numéro
    public Optional<Chambre> getChambreByNumber(Integer number) {
        return chambreRepository.findByNumber(number);
    }

    // Trouver toutes les chambres d'un type spécifique
    public List<Chambre> getChambresByType(String type) {
        return chambreRepository.findByType(type);
    }

    // Trouver toutes les chambres disponibles
    public List<Chambre> getChambresByStatus(String status) {
        return chambreRepository.findByStatus(status);
    }

    // Trouver toutes les chambres gérées par un administrateur spécifique
    public List<Chambre> getChambresByAdmin(Admin admin) {
        return chambreRepository.findByAdmin(admin);
    }

    // Trouver toutes les chambres avec un prix inférieur ou égal à un montant donné
    public List<Chambre> getChambresByPriceLessThanEqual(Double price) {
        return chambreRepository.findByPriceLessThanEqual(price);
    }

    // Trouver toutes les chambres triées par prix (ordre croissant)
    public List<Chambre> getChambresOrderByPriceAsc() {
        return chambreRepository.findAllByOrderByPriceAsc();
    }

    // Trouver toutes les chambres triées par numéro (ordre décroissant)
    public List<Chambre> getChambresOrderByNumberDesc() {
        return chambreRepository.findAllByOrderByNumberDesc();
    }

    // Compter le nombre de chambres d'un type donné
    public long countChambresByType(String type) {
        return chambreRepository.countByType(type);
    }

    // Vérifier si une chambre existe avec un numéro spécifique
    public boolean chambreExistsByNumber(Integer number) {
        return chambreRepository.existsByNumber(number);
    }

    // Trouver toutes les chambres ayant un prix compris entre deux valeurs
    public List<Chambre> getChambresByPriceBetween(Double minPrice, Double maxPrice) {
        return chambreRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // Trouver tous les résidents associés à une chambre donnée
    public List<Resident> getResidentsByChambre(Integer chambreId) {
        return chambreRepository.findResidentsById(chambreId);
    }

    // Ajouter ou mettre à jour une chambre
    public Chambre saveChambre(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

    // Supprimer une chambre
    public void deleteChambre(Integer chambreId) {
        chambreRepository.deleteById(chambreId);
    }


  




















    // Méthode pour obtenir une chambre avec ses détails en utilisant son ID
    public ChambreDTO getChambreDetails(Integer chambreId) {
        // Trouver la chambre
        Optional<Chambre> chambreOpt = chambreRepository.findById(chambreId);
        if (!chambreOpt.isPresent()) {
            return null; // ou gérer selon la logique d'erreur
        }

        Chambre chambre = chambreOpt.get();
        ChambreDTO chambreDTO = new ChambreDTO();
        chambreDTO.setId(chambre.getId());
        chambreDTO.setNumber(chambre.getNumber());
        chambreDTO.setType(chambre.getType());
        chambreDTO.setStatus(chambre.getStatus());
        chambreDTO.setPrice(chambre.getPrice());
        chambreDTO.setNumberCurent(chambre.getNumberCurent());
        chambreDTO.setNumberResidentPossible(chambre.getNumberResidentPossible());


        // Récupérer les incidents liés à la chambre
        List<InciDTO> inciDTOList = new ArrayList<>();
        for (Incident incident : chambre.getIncidents()) {
            InciDTO inciDTO = new InciDTO();
            inciDTO.setDescription(incident.getDescription());
            inciDTO.setDateAlert(incident.getDateAlert());
            inciDTO.setDateResolved(incident.getDateResolved());
            inciDTO.setStatus(incident.getStatus());

            // Trouver le technicien
            if (incident.getTechnicien() != null) {
                Technicien technicien = incident.getTechnicien();
                TechDTO techDTO = new TechDTO();
                techDTO.setFirstName(technicien.getFirstName());
                techDTO.setLastName(technicien.getLastName());
                inciDTO.setFirstNameTechnicien(techDTO.getFirstName());
                inciDTO.setLastNameTechnicien(techDTO.getLastName());
                chambreDTO.setNumberCurent(chambre.getNumberCurent());
                chambreDTO.setNumberResidentPossible(chambre.getNumberResidentPossible());

            }

            inciDTOList.add(inciDTO);
        }

        chambreDTO.setIncidents(inciDTOList);

        // Récupérer les résidents liés à la chambre
        List<ResDTO> resDTOList = new ArrayList<>();
        for (Resident resident : chambre.getResidents()) {
            ResDTO resDTO = new ResDTO();
            resDTO.setFirstNameResident(resident.getFirstName());
            resDTO.setLastNameResident(resident.getLastName());
            resDTO.setTelephone(resident.getTelephone());
            resDTO.setId(resident.getId());



            // Déterminer le statut du paiement
            String statusPayment = "Paid";
            for (Payment payment : resident.getPaiements()) {
                if (payment.getIsSet() != null && payment.getIsSet()) {
                    statusPayment = "PendingPayment";
                } else if (payment.getStatus().equals("LatePayment")) {
                    statusPayment = "LatePayment";
                }
            }
            resDTO.setStatusPayment(statusPayment);

            resDTOList.add(resDTO);
        }

        chambreDTO.setResidents(resDTOList);

        return chambreDTO;
    }











    // Méthode pour obtenir toutes les chambres avec leurs détails
    public List<ChambreDTO> getAllChambres() {
        List<Chambre> chambres = chambreRepository.findAll();
        List<ChambreDTO> chambreDTOList = new ArrayList<>();

        for (Chambre chambre : chambres) {
           
        
            ChambreDTO chambreDTO = new ChambreDTO();
            chambreDTO.setId(chambre.getId());
            chambreDTO.setNumber(chambre.getNumber());
            chambreDTO.setType(chambre.getType());
            chambreDTO.setStatus(chambre.getStatus());
            chambreDTO.setPrice(chambre.getPrice());
            chambreDTO.setNumberCurent(chambre.getNumberCurent());
            chambreDTO.setNumberResidentPossible(chambre.getNumberResidentPossible());


            // Récupérer les incidents liés à la chambre
            List<InciDTO> inciDTOList = new ArrayList<>();
            for (Incident incident : chambre.getIncidents()) {
                InciDTO inciDTO = new InciDTO();
                inciDTO.setDescription(incident.getDescription());
                inciDTO.setDateAlert(incident.getDateAlert());
                inciDTO.setDateResolved(incident.getDateResolved());
                inciDTO.setStatus(incident.getStatus());

                // Trouver le technicien
                if (incident.getTechnicien() != null) {
                    Technicien technicien = incident.getTechnicien();
                    TechDTO techDTO = new TechDTO();
                    techDTO.setFirstName(technicien.getFirstName());
                    techDTO.setLastName(technicien.getLastName());
                    inciDTO.setFirstNameTechnicien(techDTO.getFirstName());
                    inciDTO.setLastNameTechnicien(techDTO.getLastName());
                }

                inciDTOList.add(inciDTO);
            }

            chambreDTO.setIncidents(inciDTOList);

            // Récupérer les résidents liés à la chambre
            List<ResDTO> resDTOList = new ArrayList<>();
            for (Resident resident : chambre.getResidents()) {
                ResDTO resDTO = new ResDTO();
                resDTO.setFirstNameResident(resident.getFirstName());
                resDTO.setLastNameResident(resident.getLastName());
                resDTO.setTelephone(resident.getTelephone());
                resDTO.setId(resident.getId());

                // Déterminer le statut du paiement
                String statusPayment = "Paid";
                for (Payment payment : resident.getPaiements()) {
                    if (payment.getIsSet() != null && payment.getIsSet()) {
                        statusPayment = "PendingPayment";
                    } else if (payment.getStatus().equals("LatePayment")) {
                        statusPayment = "LatePayment";
                    }
                }
                resDTO.setStatusPayment(statusPayment);

                resDTOList.add(resDTO);
            }

            chambreDTO.setResidents(resDTOList);
            chambreDTOList.add(chambreDTO);
        }

        return chambreDTOList;
    }






     @Autowired
    private AdminRepository adminRepository;

    // Méthode pour ajouter une chambre et associer un admin via adminId
    public void addChambreWithAdmin(Chambre chambre) {
        if (chambre.getAdmin() == null || chambre.getAdmin().getId() == null) {
            throw new IllegalArgumentException("L'ID de l'administrateur est obligatoire.");
        }

        // Récupérer l'administrateur avec l'ID
        Admin admin = adminRepository.findById(chambre.getAdmin().getId()).orElseThrow(() -> 
            new IllegalArgumentException("Admin introuvable pour l'ID : " + chambre.getAdmin().getId())
        );

        // Associer l'administrateur à la chambre
        chambre.setAdmin(admin);

        // Sauvegarder la chambre
        chambreRepository.save(chambre);
    }




    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    public void deleteChambreWithResidentsAndIncidents(Integer chambreId) {
        // Vérifier si la chambre existe
        Chambre chambre = chambreRepository.findById(chambreId)
                .orElseThrow(() -> new IllegalArgumentException("Chambre introuvable avec l'ID : " + chambreId));

        // Dissocier les résidents associés à la chambre
        for (Resident resident : chambre.getResidents()) {
            resident.setChambre(null); // Dissocier la chambre de chaque résident
            residentRepository.save(resident); // Sauvegarder la modification
        }

        // Dissocier les incidents associés à la chambre
        for (Incident incident : chambre.getIncidents()) {
            incident.setChambre(null); // Dissocier l'incident de la chambre
            incidentRepository.save(incident); // Sauvegarder la modification
        }

        // Supprimer la chambre
        chambreRepository.delete(chambre);
    }





    public Chambre findOptimalChambreByType(String type) {
        List<Chambre> chambres = chambreRepository.findByType(type); // Récupérer toutes les chambres du type spécifié

        // Filtrer les chambres pour celles qui ont encore de la place
        Chambre optimalChambre = null;
        for (Chambre chambre : chambres) {
            if (chambre.getNumberResidentPossible() > chambre.getNumberCurent()) {
                // Si la chambre est encore disponible (nombre de résidents possible > nombre actuel)
                if (optimalChambre == null || chambre.getNumberCurent() < optimalChambre.getNumberCurent()) {
                    // On choisit la chambre avec le moins de résidents actuels (si plus d'une chambre possible)
                    optimalChambre = chambre;
                }
            }
        }

        return optimalChambre; // Retourner la chambre optimale ou null si aucune chambre disponible
    }
    


     // Méthode pour sauvegarder une chambre
     public Chambre save(Chambre chambre) {
        return chambreRepository.save(chambre);
    }





}




