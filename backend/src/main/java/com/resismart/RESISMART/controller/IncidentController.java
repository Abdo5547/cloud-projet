package com.resismart.RESISMART.controller;

import com.resismart.RESISMART.dto.IncidentDescriptionDTO;
import com.resismart.RESISMART.dto.IncidentDtoV1;
import com.resismart.RESISMART.models.Incident;
import com.resismart.RESISMART.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/incidents")
public class IncidentController {

    @Autowired
    private IncidentService incidentService;

    // Récupérer tous les incidents
    

    // Récupérer un incident par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Integer id) {
        Optional<Incident> incident = incidentService.getIncidentById(id);
        return incident.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Ajouter un nouvel incident
    @PostMapping("/add")
    public ResponseEntity<Incident> createIncident(@RequestBody Incident incident) {
        Incident savedIncident = incidentService.saveIncident(incident);
        return ResponseEntity.ok(savedIncident);
    }

    // Mettre à jour un incident
    @PutMapping("/{id}")
    public ResponseEntity<Incident> updateIncident(@PathVariable Integer id, @RequestBody Incident incident) {
        Optional<Incident> existingIncident = incidentService.getIncidentById(id);
        if (existingIncident.isPresent()) {
            incident.setId(id);
            Incident updatedIncident = incidentService.saveIncident(incident);
            return ResponseEntity.ok(updatedIncident);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un incident par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Integer id) {
        Optional<Incident> existingIncident = incidentService.getIncidentById(id);
        if (existingIncident.isPresent()) {
            incidentService.deleteIncidentById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Récupérer le nombre d'incidents résolus
    @GetMapping("/count/resolved")
    public long getResolvedCount() {
        return incidentService.getResolvedIncidentsCount();
    }

    // Récupérer le nombre d'incidents non résolus
    @GetMapping("/count/unresolved")
    public long getUnresolvedCount() {
        return incidentService.getUnresolvedIncidentsCount();
    }

    // Récupérer les incidents résolus
    @GetMapping("/resolved")
    public List<Incident> getResolvedIncidents() {
        return incidentService.getResolvedIncidents();
    }

    // Récupérer les incidents non résolus
    @GetMapping("/unresolved")
    public List<Incident> getUnresolvedIncidents() {
        return incidentService.getUnresolvedIncidents();
    }

    // Récupérer les incidents d'une chambre spécifique
    @GetMapping("/chambre/{chambreId}")
    public List<Incident> getIncidentsByChambre(@PathVariable Integer chambreId) {
        return incidentService.getIncidentsByChambreId(chambreId);
    }

    // Récupérer les incidents attribués à un technicien spécifique
    @GetMapping("/technicien/{technicienId}")
    public List<Incident> getIncidentsByTechnicien(@PathVariable Integer technicienId) {
        return incidentService.getIncidentsByTechnicienId(technicienId);
    }

    // Récupérer les incidents signalés dans une période donnée
  
    // Vérifier si une chambre a des incidents non résolus
    @GetMapping("/chambre/{chambreId}/unresolved")
    public boolean hasUnresolvedIncidents(@PathVariable Integer chambreId) {
        return incidentService.hasUnresolvedIncidents(chambreId);
    }


    @GetMapping("/requests/statistiques")
    public Object getIncidentRequests() {
        return new Object() {
            public long inProgress = incidentService.getInProgressCount();
            public long resolved = incidentService.getResolvedCount();
        };
    }



    // Récupérer tous les incidents
    @GetMapping("/all")
    public ResponseEntity<List<IncidentDtoV1>> getAllIncidents() {
        List<IncidentDtoV1> incidentDtos = incidentService.getAllIncidents();
        return new ResponseEntity<>(incidentDtos, HttpStatus.OK);
    }



     @GetMapping("description/{id}")
    public IncidentDescriptionDTO getIncidentDescriptionById(@PathVariable Integer id) {
        Incident incident = incidentService.getIncidentById(id).orElse(null);
        if (incident != null) {
            return new IncidentDescriptionDTO(incident.getId(), incident.getDescription());
        } else {
            // Retourne une réponse appropriée si l'incident n'est pas trouvé
            return null;
        }
    }

    

    @PutMapping("/{incidentId}/{technicienId}")
    public ResponseEntity<?> updateIncident(
            @PathVariable Integer incidentId,
            @PathVariable Integer technicienId,
            @RequestBody IncidentDtoV1 updateRequest) {

        // Mettre à jour uniquement le technicien et le statut
        Incident updatedIncident = incidentService.updateTechnicienAndFields(incidentId, technicienId, updateRequest.getStatus(), updateRequest.getDateAlert()
    );
        // Retourner l'incident mis à jour
        return ResponseEntity.ok("mise a jour avec success");
    }




    @PutMapping("/{id}/dateResolved")
public ResponseEntity<String> updateIncidentDateResolved(
    @PathVariable Integer id, 
    @RequestBody Map<String, String> requestBody) {

    // Récupérer la dateResolved et le status depuis la map
    String newDateResolvedStr = requestBody.get("newDateResolved");
    String newStatus = requestBody.get("newStatus");
    
    if (newDateResolvedStr == null || newStatus == null) {
        return ResponseEntity.badRequest().body("La dateResolved et le status sont requis"); // Si l'une des valeurs est manquante
    }
    
    // Convertir la chaîne en Date
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    Date newDateResolved = null;
    try {
        newDateResolved = new java.sql.Date(dateFormat.parse(newDateResolvedStr).getTime());
    } catch (ParseException e) {
        return ResponseEntity.badRequest().body("Format de date invalide. Utilisez 'yyyy-MM-dd'.");
    }

    Optional<Incident> existingIncident = incidentService.getIncidentById(id);
    
    if (existingIncident.isPresent()) {
        Incident incident = existingIncident.get();
        
        // Mettre à jour la dateResolved et le status
        incident.setDateResolved(newDateResolved);
        incident.setStatus(newStatus);
        
        // Sauvegarder l'incident mis à jour
        Incident updatedIncident = incidentService.saveIncident(incident);
        
        // Retourner un message de succès
        return ResponseEntity.ok("L'incident a été mis à jour avec succès");
    } else {
        return ResponseEntity.notFound().build();
    }
    }



@GetMapping("/incidents/resident/{id}")
public List<Incident> getIncidentsByResidentId(@PathVariable Integer id) {
    return incidentService.getIncidentsByResidentId(id);
}


}































