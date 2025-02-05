package com.resismart.RESISMART.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.resismart.RESISMART.models.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Integer> {

    Optional<Resident> findMyUsersByUserName(String UserName);

    Boolean existsByUserName(String userName);


    Optional<Resident> findById(String id);

    // Trouver un résident par nom
    List<Resident> findByFirstName(String firstName);

    // Trouver un résident par prénom
    List<Resident> findByLastName(String LastName);

    // Trouver un résident par numéro de téléphone
    Optional<Resident> findByTelephone(String telephone);

    // Supprimer un résident par userName
    void deleteByUserName(String userName);


        // Nombre total de résidents
    @Query("SELECT COUNT(r) FROM Resident r")
    long countTotalResidents();

    // Nombre de résidents occupant une chambre
    @Query("SELECT COUNT(r) FROM Resident r WHERE r.chambre IS NOT NULL")
    long countOccupiedRooms();

    // Nombre de chambres disponibles
    @Query("SELECT COUNT(c.id) FROM Chambre c WHERE c.id NOT IN (SELECT r.chambre.id FROM Resident r WHERE r.chambre IS NOT NULL)")
    long countAvailableRooms();



}
