package com.resismart.RESISMART.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Technicien;

import java.util.List;
import java.util.Optional;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Integer> {

    // Trouver un technicien par son identifiant
    Optional<Technicien> findById(Integer id);

    // Trouver tous les techniciens associés à un administrateur spécifique
    List<Technicien> findByAdmin(Admin admin);

    // Trouver tous les techniciens avec un nom spécifique
    List<Technicien> findByFirstName(String firstName);

    // Trouver tous les techniciens avec un nom de famille spécifique
    List<Technicien> findByLastName(String lastName);

    // Trouver tous les techniciens avec une spécialité spécifique
    List<Technicien> findBySpeciality(String speciality);

    // Trouver tous les techniciens avec un numéro de téléphone spécifique
    List<Technicien> findByTelephone(String telephone);

    // Compter le nombre de techniciens pour un administrateur donné
    long countByAdmin(Admin admin);

    // Vérifier si un technicien existe avec un identifiant spécifique
    boolean existsById(Integer id);

    // Trouver tous les techniciens triés par nom (ordre croissant)
    List<Technicien> findAllByOrderByLastNameAsc();

    // Trouver tous les techniciens triés par spécialité (ordre croissant)
    List<Technicien> findAllByOrderBySpecialityAsc();

}
