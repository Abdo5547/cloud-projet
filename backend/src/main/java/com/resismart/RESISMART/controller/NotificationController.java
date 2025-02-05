package com.resismart.RESISMART.controller;

import com.resismart.RESISMART.models.Notification;
import com.resismart.RESISMART.models.Payment;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.repository.ChambreRepository;
import com.resismart.RESISMART.repository.PaymentRepository;
import com.resismart.RESISMART.repository.ResidentRepository;
import com.resismart.RESISMART.dto.NotificationDTO;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.service.ChambreService;
import com.resismart.RESISMART.service.NotificationService;
import com.resismart.RESISMART.service.ResidentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private  NotificationService notificationService;


    @Autowired
    private  ResidentRepository residentRepository;

   
    @Autowired
    private  ChambreRepository chambreRepository;

    @Autowired
    private  PaymentRepository paymentRepository;

   


   

    // Endpoint pour obtenir une notification par son ID
    @GetMapping("/{id}")
    public Optional<Notification> getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

    // Endpoint pour obtenir les notifications d'un résident spécifique
    @GetMapping("/resident/{residentId}")
    public List<NotificationDTO> getNotificationsByResident(@PathVariable Integer residentId) {
        Resident resident = new Resident(); // Il faudrait récupérer le résident depuis la base de données
        resident.setId(residentId);
        return notificationService.getNotificationsByResident(resident);
    }

    // Endpoint pour obtenir les notifications d'une chambre spécifique
    @GetMapping("/chambre/{chambreId}")
    public List<Notification> getNotificationsByChambre(@PathVariable Integer chambreId) {
        Chambre chambre = new Chambre(); // Il faudrait récupérer la chambre depuis la base de données
        chambre.setId(chambreId);
        return notificationService.getNotificationsByChambre(chambre);
    }

    // Endpoint pour obtenir les notifications avec un statut spécifique
    @GetMapping("/status/{status}")
    public List<Notification> getNotificationsByStatus(@PathVariable String status) {
        return notificationService.getNotificationsByStatus(status);
    }

    // Endpoint pour obtenir les notifications triées par date (ordre croissant)
    @GetMapping("/sorted/asc")
    public List<Notification> getNotificationsSortedByDateAsc() {
        return notificationService.getNotificationsSortedByDateAsc();
    }

    // Endpoint pour obtenir les notifications triées par date (ordre décroissant)
    @GetMapping("/sorted/desc")
    public List<Notification> getNotificationsSortedByDateDesc() {
        return notificationService.getNotificationsSortedByDateDesc();
    }

    // Endpoint pour compter le nombre de notifications pour un résident donné
    @GetMapping("/count/resident/{residentId}")
    public long countNotificationsByResident(@PathVariable Integer residentId) {
        Resident resident = new Resident(); // Il faudrait récupérer le résident depuis la base de données
        resident.setId(residentId);
        return notificationService.countNotificationsByResident(resident);
    }

    // Endpoint pour vérifier si une notification existe avec un statut spécifique
    @GetMapping("/exists/status/{status}")
    public boolean existsByStatus(@PathVariable String status) {
        return notificationService.existsByStatus(status);
    }

    // Endpoint pour obtenir toutes les notifications associées à un résident et une chambre spécifique
    @GetMapping("/resident/{residentId}/chambre/{chambreId}")
    public List<Notification> getNotificationsByResidentAndChambre(
            @PathVariable Integer residentId,
            @PathVariable Integer chambreId) {
        Resident resident = new Resident(); // Il faudrait récupérer le résident depuis la base de données
        resident.setId(residentId);

        Chambre chambre = new Chambre(); // Il faudrait récupérer la chambre depuis la base de données
        chambre.setId(chambreId);

        return notificationService.getNotificationsByResidentAndChambre(resident, chambre);
    }



    @GetMapping("/allnotifications")
    public List<NotificationDTO> getAllNotifications() {
        return notificationService.getAllNotifications();


    }




    @PutMapping("/{id}/status")
public ResponseEntity<String> updateStatusAndAssociateResident(
    @PathVariable Integer id,
    @RequestBody Map<String, Object> requestBody) {

    // Récupérer les champs du corps de la requête
    String newStatus = (String) requestBody.get("status");
    Integer residentId = (Integer) requestBody.get("residentId");
    Integer chambreId = (Integer) requestBody.get("chambreId");

    // Validation des données
    if (residentId == null || chambreId == null) {
        return ResponseEntity.badRequest().body("Resident ID and Chambre ID must not be null");
    }

    // Vérifiez si les entités existent
    Resident resident = residentRepository.findById(residentId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid Resident ID: " + residentId));
    Chambre chambre = chambreRepository.findById(chambreId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid Chambre ID: " + chambreId));

    // Associer le résident à la chambre
    resident.setChambre(chambre);  // Met à jour la chambre dans le résident
    chambre.getResidents().add(resident); // Ajoute le résident à la liste des résidents de la chambre

    // Sauvegarder les entités
    residentRepository.save(resident);
    chambreRepository.save(chambre);

        Payment payment = new Payment();
        payment.setAmount(chambre.getPrice()); // Le montant correspond au prix de la chambre
        payment.setStatus("LatePayment"); // Statut initial
        payment.setDatePayment(null); // Pas encore payé
        payment.setIsSet(false); // Non réglé
        payment.setResident(resident);

        paymentRepository.save(payment);


       
    // Mettre à jour le statut
    boolean updated = notificationService.updateNotificationStatus(id, newStatus);

    if (updated) {
        return ResponseEntity.ok("Statut mis à jour et résident associé à la chambre avec succès");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification non trouvée");
    }
}






    @PostMapping("/addnotif")
    public ResponseEntity<String> createNotification(@RequestBody NotificationRequest request) {
        try {
            String result = notificationService.createNotification(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the notification");
        }
    }


}
