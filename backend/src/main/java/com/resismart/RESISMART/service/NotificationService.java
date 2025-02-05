package com.resismart.RESISMART.service;

import com.resismart.RESISMART.models.Notification;
import com.resismart.RESISMART.models.Payment;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.controller.NotificationRequest;
import com.resismart.RESISMART.dto.NotificationDTO;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.repository.ChambreRepository;
import com.resismart.RESISMART.repository.NotificationRepository;
import com.resismart.RESISMART.repository.PaymentRepository;
import com.resismart.RESISMART.repository.ResidentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private NotificationRepository notificationRepository;

    



    // Méthode pour obtenir une notification par son ID
    public Optional<Notification> getNotificationById(Integer id) {
        return notificationRepository.findById(id);
    }

    // Méthode pour obtenir toutes les notifications d'un résident spécifique
    public List<NotificationDTO> getNotificationsByResident(Resident resident) {
        return notificationRepository.findByResident(resident);
    }

    // Méthode pour obtenir toutes les notifications liées à une chambre spécifique
    public List<Notification> getNotificationsByChambre(Chambre chambre) {
        return notificationRepository.findByChambre(chambre);
    }

    // Méthode pour obtenir toutes les notifications avec un statut spécifique
    public List<Notification> getNotificationsByStatus(String status) {
        return notificationRepository.findByStatus(status);
    }

    // Méthode pour obtenir toutes les notifications triées par date (ordre croissant)
    public List<Notification> getNotificationsSortedByDateAsc() {
        return notificationRepository.findAllByOrderByDateAsc();
    }

    // Méthode pour obtenir toutes les notifications triées par date (ordre décroissant)
    public List<Notification> getNotificationsSortedByDateDesc() {
        return notificationRepository.findAllByOrderByDateDesc();
    }

    // Méthode pour compter le nombre de notifications pour un résident donné
    public long countNotificationsByResident(Resident resident) {
        return notificationRepository.countByResident(resident);
    }

    // Méthode pour vérifier si une notification existe avec un statut spécifique
    public boolean existsByStatus(String status) {
        return notificationRepository.existsByStatus(status);
    }

    // Méthode pour obtenir toutes les notifications associées à un résident et une chambre spécifique
    public List<Notification> getNotificationsByResidentAndChambre(Resident resident, Chambre chambre) {
        return notificationRepository.findByResidentAndChambre(resident, chambre);
    }


    public List<NotificationDTO> getAllNotifications() {
        List<Notification> notifications = notificationRepository.findAll();

        // Convertir les Notification en NotificationDTO
        return notifications.stream()
                            .map(NotificationDTO::new)
                            .collect(Collectors.toList());
    }




    public boolean updateNotificationStatus(Integer id, String newStatus) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setStatus(newStatus);  // Mise à jour du statut
            notificationRepository.save(notification); // Sauvegarde dans la base de données
            return true;
        }
        return false;  // Retourne false si la notification n'a pas été trouvée
    }


    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }




    private final ResidentService residentService;
    private final ChambreService chambreService;



@Autowired
    private PaymentRepository paymentRepository;


    


    
    @Autowired
    public NotificationService(NotificationRepository notificationRepository, 
                               ResidentService residentService, 
                               ChambreService chambreService) {
        this.notificationRepository = notificationRepository;
        this.residentService = residentService;
        this.chambreService = chambreService;
    }

    public String createNotification(NotificationRequest request) {
        // Étape 1 : Trouver le résident
        Resident resident = residentService.getResidentByUserName(request.getUserName())
                .orElseThrow(() -> new RuntimeException("Resident not found with username: " + request.getUserName()));

        // Étape 2 : Trouver la chambre optimale
        Chambre chambre = chambreService.findOptimalChambreByType(request.getChambreType());
        if (chambre == null) {
            throw new RuntimeException("No suitable chambre found for type: " + request.getChambreType());
        }

        // Étape 3 : Créer une notification
        Notification notification = new Notification();
        notification.setDate(request.getDate()); // Date actuelle
        notification.setStatus(request.getStatus());
        notification.setResident(resident); // Associer le résident
        notification.setChambre(chambre); // Associer la chambre

        // Enregistrer la notification
        notificationRepository.save(notification);





        return "Notification created successfully";
    }





    @Autowired
    private ChambreRepository chambreRepository;


    @Autowired
    private ResidentRepository residentRepository;


    public boolean associateResidentToChambre(Integer residentId, Integer chambreId) {
        // Vérifier si le résident existe
        Optional<Resident> residentOpt = residentRepository.findById(residentId);
        if (residentOpt.isEmpty()) {
            return false; // Résident introuvable
        }
    
        // Vérifier si la chambre existe
        Optional<Chambre> chambreOpt = chambreRepository.findById(chambreId);
        if (chambreOpt.isEmpty()) {
            return false; // Chambre introuvable
        }
    
        // Récupérer les entités
        Resident resident = residentOpt.get();
        Chambre chambre = chambreOpt.get();
    
        // Vérifier si la chambre a de la place disponible
        if (chambre.getNumberCurent() >= chambre.getNumberResidentPossible()) {
            return false; // La chambre est pleine
        }
    
        // Associer le résident à la chambre
        resident.setChambre(chambre);
    
        // Ajouter le résident à la liste des résidents de la chambre
        if (!chambre.getResidents().contains(resident)) {
            chambre.getResidents().add(resident);
        }
    
        // Incrémenter le nombre actuel de résidents
        chambre.setNumberCurent(chambre.getNumberCurent() + 1);
    
        // Sauvegarder les entités mises à jour
        residentRepository.save(resident);
        chambreRepository.save(chambre);
    
        return true;
    }
    

}



