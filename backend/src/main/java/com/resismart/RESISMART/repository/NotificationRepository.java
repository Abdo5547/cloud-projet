package com.resismart.RESISMART.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.resismart.RESISMART.models.Notification;
import com.resismart.RESISMART.models.Payment;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.dto.NotificationDTO;
import com.resismart.RESISMART.models.Chambre;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {


    // Méthode pour obtenir toutes les notifications
    List<Notification> findAll();

    // Trouver une notification par son ID
    Optional<Notification> findById(Integer id);

    // Trouver toutes les notifications d'un résident spécifique
    List<NotificationDTO> findByResident(Resident resident);

    // Trouver toutes les notifications liées à une chambre spécifique
    List<Notification> findByChambre(Chambre chambre);

    // Trouver toutes les notifications avec un statut spécifique
    List<Notification> findByStatus(String status);

    // Trouver toutes les notifications triées par date (ordre croissant)
    List<Notification> findAllByOrderByDateAsc();

    // Trouver toutes les notifications triées par date (ordre décroissant)
    List<Notification> findAllByOrderByDateDesc();

    // Compter le nombre de notifications pour un résident donné
    long countByResident(Resident resident);

    // Vérifier si une notification existe avec un statut spécifique
    boolean existsByStatus(String status);

    // Trouver toutes les notifications associées à un résident et une chambre spécifique

    List<Notification> findByResidentAndChambre(Resident resident, Chambre chambre);







}
