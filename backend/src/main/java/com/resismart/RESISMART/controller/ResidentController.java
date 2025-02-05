package com.resismart.RESISMART.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.resismart.RESISMART.auth.models.AdminRequest;
import com.resismart.RESISMART.auth.utils.JwtUtil;
import com.resismart.RESISMART.dto.ResidentDTO;
import com.resismart.RESISMART.dto.ResidentDTOvfinale;
import com.resismart.RESISMART.dto.residentdto.ResidentInfoDTO;
import com.resismart.RESISMART.mapper.ResidentInfoMapper;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.repository.ChambreRepository;
import com.resismart.RESISMART.repository.ResidentRepository;
import com.resismart.RESISMART.service.ResidentService;

import java.sql.*;
import java.util.*;

@RestController
@RequestMapping("/resident")
public class ResidentController {

    @Autowired
    private ResidentService residentService;


     @Autowired
    private ResidentRepository residentRepository;



    @Autowired
    private ChambreRepository chambreRepository;



    @Autowired
    private JwtUtil jwtUtils;



    
    // Créer un résident (Create)
    @PostMapping("/addr")
    public String addResident(@RequestBody Resident resident) {
        residentService.createResident(resident);
        return "New resident is added";
    }



    // Authentifier et obtenir un JWT (Login)
    @PostMapping("/loginresident")
    public ResponseEntity<?> authenticateAndGetJWT(@RequestBody AdminRequest authRequest) throws Exception {
        String url = "jdbc:mysql://localhost:3306/jee_gestion_residences";
        String user = "root";
        String password = "aK4nnL7C53BDcIKp";

        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            String email = authRequest.getUserName();
            String passwordd = authRequest.getPassword();
            System.out.println(email+passwordd);

            String sql = "SELECT * FROM resident WHERE user_name = ? AND password = ?";

            try (PreparedStatement stmt = connection.prepareStatement(sql)) {
                stmt.setString(1, email);
                stmt.setString(2, passwordd);

                ResultSet rs = stmt.executeQuery();

                System.out.println(rs);

                if (rs.next()) {
                    
                    Resident userFromDB = new Resident();
                    userFromDB.setUserName(rs.getString("user_name"));

                    JwtUtil jwtUtil = new JwtUtil();
                    String jwtToken = jwtUtil.generateJWT(Optional.of(userFromDB));

                    Map<String, String> response = new HashMap<>();
                    response.put("token", jwtToken);
                    response.put("message", "Authentication successful");

                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentialskk");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error");
        }
    }




    // Lire un résident par ID (Read - Get by ID)
    @GetMapping("/getr/{id}")
    public ResponseEntity<Resident> getResidentById(@PathVariable Integer id) {
        Optional<Resident> resident = residentService.getResidentById(Integer.valueOf(id));
        return resident.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    // Mettre à jour un résident (Update)
    @PutMapping("/update/{id}")
    public ResponseEntity<Resident> updateResident(
            @PathVariable Integer id, 
            @RequestBody Resident residentDetails,
            @RequestHeader(value = "Authorization", required = true) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            Resident updatedResident = residentService.updateResident(Integer.valueOf(id), residentDetails);
            return ResponseEntity.ok(updatedResident);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un résident (Delete)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteResident(
            @PathVariable Integer id,
            @RequestHeader(value = "Authorization", required = true) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            residentService.deleteResident(Integer.valueOf(id));
            return ResponseEntity.ok("Resident with ID " + id + " is deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident with ID " + id + " not found.");
        }
    }



     @GetMapping("/residents")
    public List<ResidentDTO> getAllResidents() {
        List<Resident> residents = residentRepository.findAll();
        return residentService.convertToDTOList(residents);
    }




@PutMapping("/{residentId}/deletechambre")
public ResponseEntity<String> removeChambreFromResident(@PathVariable Integer residentId) {
    // Rechercher le résident par son ID
    Optional<Resident> optionalResident = residentRepository.findById(residentId);

    if (optionalResident.isPresent()) {
        Resident resident = optionalResident.get();

        // Vérifier si le résident a une chambre associée
        if (resident.getChambre() != null) {
            Chambre chambre = resident.getChambre();

            // Décrémenter le nombre courant des résidents dans la chambre
            if (chambre.getNumberCurent() != null && chambre.getNumberCurent() > 0) {
                chambre.setNumberCurent(chambre.getNumberCurent() - 1);
            }

            // Sauvegarder les modifications de la chambre
            chambreRepository.save(chambre);

            // Supprimer l'association entre le résident et la chambre
            resident.setChambre(null);
            residentRepository.save(resident); // Sauvegarder les modifications du résident

            return ResponseEntity.ok("L'association entre le résident et la chambre a été supprimée.");
        } else {
            return ResponseEntity.badRequest().body("Ce résident n'a aucune chambre associée.");
        }
    } else {
        return ResponseEntity.notFound().build(); // Résident non trouvé
    }
}






    //fat all info resident


    @GetMapping("/{id}")
    public ResponseEntity<ResidentInfoDTO> getResidentDetails(@PathVariable Integer id) {
        ResidentInfoDTO residentDTO = residentService.getResidentDetails(id);
        if (residentDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(residentDTO);
    }








    @GetMapping("/me")
public ResponseEntity<ResidentInfoDTO> getResidentFromToken(@RequestHeader("Authorization") String token) {
    try {
        // Supprimer le préfixe "Bearer "
        token = token.replace("Bearer ", "");

        // Extraire le nom d'utilisateur depuis le token
        String username = jwtUtils.extractUserName(token);

        // Récupérer l'admin correspondant
        Optional<Resident> resident = residentService.getResidentByUserName(username);

        // Retourner les détails de l'admin


   return resident.map(a -> ResponseEntity.ok(ResidentInfoMapper.toDTO(a))).orElse(ResponseEntity.notFound().build());    
} catch (Exception e) {
        return ResponseEntity.status(401).build(); // Non autorisé si erreur
    }
}













@PostMapping("/register")
public Resident registerResident(@RequestBody ResidentDTOvfinale residentDTO) {
    return residentService.saveResident(residentDTO);
}

}
