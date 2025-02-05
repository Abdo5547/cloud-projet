package com.resismart.RESISMART.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resismart.RESISMART.auth.AdminRepository;
import com.resismart.RESISMART.dto.TechnicienDTO;
import com.resismart.RESISMART.dto.TechnicienRequestDTO;
import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Technicien;
import com.resismart.RESISMART.repository.TechnicienRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TechnicienService {

    @Autowired
    private TechnicienRepository technicienRepository;


     @Autowired
    private AdminRepository adminRepository;

    // Trouver un technicien par son identifiant
    public Optional<Technicien> findTechnicienById(Integer id) {
        return technicienRepository.findById(id);
    }

    // Trouver tous les techniciens associés à un administrateur spécifique
    public List<Technicien> findTechniciensByAdmin(Admin admin) {
        return technicienRepository.findByAdmin(admin);
    }

    // Trouver tous les techniciens avec un prénom spécifique
    public List<Technicien> findTechniciensByFirstName(String firstName) {
        return technicienRepository.findByFirstName(firstName);
    }

    // Trouver tous les techniciens avec un nom de famille spécifique
    public List<Technicien> findTechniciensByLastName(String lastName) {
        return technicienRepository.findByLastName(lastName);
    }

    // Trouver tous les techniciens avec une spécialité spécifique
    public List<Technicien> findTechniciensBySpeciality(String speciality) {
        return technicienRepository.findBySpeciality(speciality);
    }

    // Trouver tous les techniciens avec un téléphone spécifique
    public List<Technicien> findTechniciensByTelephone(String telephone) {
        return technicienRepository.findByTelephone(telephone);
    }

    // Compter le nombre de techniciens pour un administrateur donné
    public long countTechniciensByAdmin(Admin admin) {
        return technicienRepository.countByAdmin(admin);
    }

    // Vérifier si un technicien existe avec un identifiant spécifique
    public boolean existsTechnicienById(Integer id) {
        return technicienRepository.existsById(id);
    }

    // Ajouter un technicien
    public Technicien addTechnicien(Technicien technicien) {
        return technicienRepository.save(technicien);
    }

    // Mettre à jour un technicien
    public Technicien updateTechnicien(Technicien technicien) {
        return technicienRepository.save(technicien);
    }

    // Supprimer un technicien
    public void deleteTechnicien(Integer id) {
        technicienRepository.deleteById(id);
    }

    // Trouver tous les techniciens triés par nom (ordre croissant)
    public List<Technicien> findAllTechniciensSortedByLastName() {
        return technicienRepository.findAllByOrderByLastNameAsc();
    }

    // Trouver tous les techniciens triés par spécialité (ordre croissant)
    public List<Technicien> findAllTechniciensSortedBySpeciality() {
        return technicienRepository.findAllByOrderBySpecialityAsc();
    }


 public List<TechnicienDTO> getAllTechniciens() {
        List<Technicien> techniciens = technicienRepository.findAll();
        return techniciens.stream()
            .map(TechnicienDTO::new)
            .collect(Collectors.toList());
    }




    public void createTechnicien(TechnicienRequestDTO technicienRequestDTO) {
        // Trouver l'Admin via l'ID
        Admin admin = adminRepository.findById(technicienRequestDTO.getAdminId()).orElseThrow(() -> new RuntimeException("Admin non trouvé"));
        // Créer le technicien
        Technicien technicien = new Technicien();

        technicien.setFirstName(technicienRequestDTO.getFirstName());
        technicien.setLastName(technicienRequestDTO.getLastName());
        technicien.setSpeciality(technicienRequestDTO.getSpeciality());
        technicien.setTelephone(technicienRequestDTO.getTelephone());
        technicien.setAdmin(admin);

        // Enregistrer le technicien en base de données
        technicienRepository.save(technicien);
    }




}
