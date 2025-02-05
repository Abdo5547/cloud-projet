package com.resismart.RESISMART.service;

import com.resismart.RESISMART.dto.IncidentDescriptionDTO;
import com.resismart.RESISMART.dto.IncidentDtoV1;
import com.resismart.RESISMART.mapper.IncidentMapper;
import com.resismart.RESISMART.models.Incident;
import com.resismart.RESISMART.models.Technicien;
import com.resismart.RESISMART.repository.IncidentRepository;
import com.resismart.RESISMART.repository.TechnicienRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IncidentService {

    @Autowired
    private IncidentRepository incidentRepository;

      @Autowired
    private TechnicienRepository technicienRepository;

    // Ajouter un nouvel incident
    public Incident saveIncident(Incident incident) {
        return incidentRepository.save(incident);
    }

    // Récupérer un incident par son ID
    public Optional<Incident> getIncidentById(Integer id) {
        return incidentRepository.findById(id);
    }

  

    // Compter les incidents résolus
    public long getResolvedIncidentsCount() {
        return incidentRepository.countByIsResolvedTrue();
    }

    // Compter les incidents non résolus
    public long getUnresolvedIncidentsCount() {
        return incidentRepository.countByIsResolvedFalse();
    }

    // Récupérer tous les incidents non résolus
    public List<Incident> getUnresolvedIncidents() {
        return incidentRepository.findByIsResolvedFalse();
    }

    // Récupérer tous les incidents résolus
    public List<Incident> getResolvedIncidents() {
        return incidentRepository.findByIsResolvedTrue();
    }

    // Récupérer les incidents d'une chambre spécifique
    public List<Incident> getIncidentsByChambreId(Integer chambreId) {
        return incidentRepository.findByChambreId(chambreId);
    }

    // Récupérer les incidents attribués à un technicien spécifique
    public List<Incident> getIncidentsByTechnicienId(Integer technicienId) {
        return incidentRepository.findByTechnicienId(technicienId);
    }

    // Supprimer un incident par son ID
    public void deleteIncidentById(Integer id) {
        incidentRepository.deleteById(id);
    }

    // Récupérer les incidents signalés dans une période donnée
    public List<Incident> getIncidentsBetweenDates(Date startDate, Date endDate) {
        return incidentRepository.findByDateAlertBetween(startDate, endDate);
    }

    // Vérifier si une chambre a des incidents non résolus
    public boolean hasUnresolvedIncidents(Integer chambreId) {
        return incidentRepository.existsByChambreIdAndIsResolvedFalse(chambreId);
    }

    
    public long getCountByStatus(boolean isResolved) {
        return incidentRepository.countByIsResolved(isResolved);
    }

    public long getInProgressCount() {
        return getCountByStatus(false); // Incidents non résolus
    }

    public long getResolvedCount() {
        return getCountByStatus(true); // Incidents résolus
    }



    public List<IncidentDtoV1> getAllIncidents() {
        List<Incident> incidents = incidentRepository.findAll();
        return incidents.stream()
                .map(IncidentMapper::toDto)
                .collect(Collectors.toList());
    } 


     public IncidentDescriptionDTO getIncidentDescriptionById(Integer id) {
        Incident incident = getIncidentById(id).orElse(null);
        if (incident != null) {
            return new IncidentDescriptionDTO(incident.getId(), incident.getDescription());
        } else {
            return null; // ou vous pouvez lancer une exception, selon votre besoin
        }
    }


     public Incident updateTechnicienAndFields(Integer incidentId, Integer technicienId, String status,Date dateAlert) {
        // Chercher l'incident par son ID
        Incident incident = incidentRepository.findById(incidentId).orElseThrow(() -> new RuntimeException("Incident non trouvé"));

        // Chercher le technicien par son ID
        Technicien technicien = technicienRepository.findById(technicienId).orElseThrow(() -> new RuntimeException("Technicien non trouvé"));

        // Modifier uniquement le technicien et le statut
        incident.setTechnicien(technicien);
        incident.setStatus(status);
        incident.setDateAlert(dateAlert);


        // Sauvegarder l'incident mis à jour
        return incidentRepository.save(incident);
    }






    



    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public List<Incident> getIncidentsByResidentId(Integer residentId) {
        return incidentRepository.findByResidentId(residentId);
    }



    

}
