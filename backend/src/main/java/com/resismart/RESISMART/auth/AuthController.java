package com.resismart.RESISMART.auth;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.*;

import com.resismart.RESISMART.auth.models.AdminRequest;
import com.resismart.RESISMART.auth.services.AdminDetailsServiceImpl;
import com.resismart.RESISMART.auth.utils.JwtUtil;
import com.resismart.RESISMART.dto.AdminDTO;
import com.resismart.RESISMART.mapper.AdminMapper;
import com.resismart.RESISMART.models.Admin;



@RestController
public class AuthController {
    //@Autowired
   // private JwtUtil jwtUtil;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    AuthenticationManager authenticationManagerr;
    @Autowired
    private AdminRepository adminDetailsRepository;

    @Autowired
    private AdminDetailsServiceImpl adminService;

    @Autowired
    private JwtUtil jwtUtils;

    @PostMapping("/adda")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
        Admin newAdmin = adminService.addAdmin(admin);
        return ResponseEntity.ok(newAdmin);
    }



     
    @PostMapping("/logina")
    public ResponseEntity<?> authenticateAndGetJWT(@RequestBody AdminRequest authRequest) throws Exception {
    String url = "jdbc:mysql://localhost:3306/jee_gestion_residences";
    String user = "root";
    String password = "aK4nnL7C53BDcIKp";

    try (Connection connection = DriverManager.getConnection(url, user, password)) {
        String email = authRequest.getUserName();
        String passwordd = authRequest.getPassword();

        String sql = "SELECT * FROM admin WHERE user_name = ? AND password = ?";

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, passwordd);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // Utilisateur authentifié, préparer un objet utilisateur
                Admin userFromDB = new Admin();
                userFromDB.setUserName(rs.getString("user_name"));

                // Générer le JWT
                JwtUtil jwtUtil = new JwtUtil();
                String jwtToken = jwtUtil.generateJWTAdmin(Optional.of(userFromDB));

                // Retourner le JWT à l'utilisateur
                Map<String, String> response = new HashMap<>();
                response.put("token", jwtToken);
                response.put("message", "Authentication successful");
              
            
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error");
    }
}




@PutMapping("up/{id}")
public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) {
    try {
        Admin admin = adminService.updateAdmin(id, updatedAdmin);
        return ResponseEntity.ok(admin);
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}


// Obtenir l'administrateur à partir du token
@GetMapping("/me")
public ResponseEntity<AdminDTO> getAdminFromToken(@RequestHeader("Authorization") String token) {
    try {
        // Supprimer le préfixe "Bearer "
        token = token.replace("Bearer ", "");

        // Extraire le nom d'utilisateur depuis le token
        String username = jwtUtils.extractUserName(token);

        // Récupérer l'admin correspondant
        Optional<Admin> admin = adminService.getAdminByUserName(username);

        // Retourner les détails de l'admin


   return admin.map(a -> ResponseEntity.ok(AdminMapper.toDTO(a))).orElse(ResponseEntity.notFound().build());    
} catch (Exception e) {
        return ResponseEntity.status(401).build(); // Non autorisé si erreur
    }
}


}
