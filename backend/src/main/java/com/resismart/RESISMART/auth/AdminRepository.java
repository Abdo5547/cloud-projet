package com.resismart.RESISMART.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.models.Technicien;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findMyUsersByUserName(String UserName);

    
    Boolean existsByUserName(String userName);

    // Trouver un administrateur par son ID
    Optional<Admin> findById(Long id);

    // Trouver un administrateur par son nom d'utilisateur
    Optional<Admin> findByUserName(String userName);

    // Trouver tous les administrateurs actifs
    List<Admin> findByActive(boolean active);

    // Trouver un administrateur par son prénom et nom
    List<Admin> findByFirstNameAndLastName(String firstName, String lastName);

    // Trouver tous les administrateurs ayant un certain rôle
    List<Admin> findByRoles(String role);

    // Trouver toutes les chambres associées à un administrateur
    List<Chambre> findChambresByid(Long id);

    // Trouver tous les résidents associés à un administrateur
    List<Resident> findResidentsByid(Long id);

    // Trouver tous les techniciens associés à un administrateur
    List<Technicien> findTechniciensByid(Long id);


    // Compter le nombre d'administrateurs actifs
    long countByActive(boolean active);

    // Compter le nombre de chambres gérées par un administrateur
    long countChambresByid(Long id);
}
