package com.resismart.RESISMART.controller;

import com.resismart.RESISMART.dto.TechnicienDTO;
import com.resismart.RESISMART.dto.TechnicienRequestDTO;
import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Technicien;
import com.resismart.RESISMART.service.TechnicienService;
import com.resismart.RESISMART.repository.TechnicienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/techniciens")
public class TechnicienController {

    @Autowired
    private TechnicienService technicienService;
    @Autowired
    private TechnicienRepository technicienRepository;



    // Trouver un technicien par son identifiant
    @GetMapping("/{id}")
    public ResponseEntity<Technicien> getTechnicienById(@PathVariable Integer id) {
        Optional<Technicien> technicien = technicienService.findTechnicienById(id);
        return technicien.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Trouver tous les techniciens associés à un administrateur spécifique
    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Technicien>> getTechniciensByAdmin(@PathVariable Long adminId) {
        Admin admin = new Admin();
        admin.setId(adminId);
        List<Technicien> techniciens = technicienService.findTechniciensByAdmin(admin);
        return ResponseEntity.ok(techniciens);
    }

  

    // Mettre à jour un technicien
    @PutMapping("/{id}")
    public ResponseEntity<Technicien> updateTechnicien(@PathVariable Integer id, @RequestBody Technicien technicien) {
        if (technicienService.existsTechnicienById(id)) {
            technicien.setId(id);
            Technicien updatedTechnicien = technicienService.updateTechnicien(technicien);
            return ResponseEntity.ok(updatedTechnicien);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un technicien
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnicien(@PathVariable Integer id) {
        if (technicienService.existsTechnicienById(id)) {
            technicienService.deleteTechnicien(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Trouver tous les techniciens triés par nom
    @GetMapping("/sorted/byLastName")
    public ResponseEntity<List<Technicien>> getAllTechniciensSortedByLastName() {
        List<Technicien> techniciens = technicienService.findAllTechniciensSortedByLastName();
        return ResponseEntity.ok(techniciens);
    }

    // Trouver tous les techniciens triés par spécialité
    @GetMapping("/sorted/bySpeciality")
    public ResponseEntity<List<Technicien>> getAllTechniciensSortedBySpeciality() {
        List<Technicien> techniciens = technicienService.findAllTechniciensSortedBySpeciality();
        return ResponseEntity.ok(techniciens);
    }



     @GetMapping("/listti")
    public List<TechnicienDTO> getAllTechniciens() {
        List<Technicien> techniciens = technicienRepository.findAll();
        return techniciens.stream()
                .map(TechnicienDTO::new)
                .collect(Collectors.toList());

    }


    @PostMapping("/add")
    public ResponseEntity<String> createTechnicien(@RequestBody TechnicienRequestDTO technicienRequestDTO) {
        technicienService.createTechnicien(technicienRequestDTO);
        return new ResponseEntity<>("Technicien créé avec succès", HttpStatus.CREATED);
    }
    


}
