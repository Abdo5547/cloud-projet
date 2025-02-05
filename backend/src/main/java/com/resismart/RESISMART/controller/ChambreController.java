package com.resismart.RESISMART.controller;

import com.resismart.RESISMART.dto.chambredto.ChambreDTO;
import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.service.ChambreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chambres")
public class ChambreController {

    @Autowired
    private ChambreService chambreService;

    // Endpoint pour récupérer une chambre par son numéro
    @GetMapping("/number/{number}")
    public Optional<Chambre> getChambreByNumber(@PathVariable Integer number) {
        return chambreService.getChambreByNumber(number);
    }

    // Endpoint pour récupérer toutes les chambres d'un type spécifique
    @GetMapping("/type/{type}")
    public List<Chambre> getChambresByType(@PathVariable String type) {
        return chambreService.getChambresByType(type);
    }

    // Endpoint pour récupérer toutes les chambres disponibles
    @GetMapping("/status/{status}")
    public List<Chambre> getChambresByStatus(@PathVariable String status) {
        return chambreService.getChambresByStatus(status);
    }

    // Endpoint pour récupérer toutes les chambres d'un administrateur spécifique
    @GetMapping("/admin/{adminId}")
    public List<Chambre> getChambresByAdmin(@PathVariable Long adminId) {
        Admin admin = new Admin();
        admin.setId(adminId);  // Assurez-vous que l'administrateur est correctement récupéré.
        return chambreService.getChambresByAdmin(admin);
    }

    // Endpoint pour récupérer toutes les chambres avec un prix inférieur ou égal à un montant donné
    @GetMapping("/price/{price}")
    public List<Chambre> getChambresByPriceLessThanEqual(@PathVariable Double price) {
        return chambreService.getChambresByPriceLessThanEqual(price);
    }

    // Endpoint pour récupérer toutes les chambres triées par prix (ordre croissant)
    @GetMapping("/order/price")
    public List<Chambre> getChambresOrderByPriceAsc() {
        return chambreService.getChambresOrderByPriceAsc();
    }

    // Endpoint pour récupérer toutes les chambres triées par numéro (ordre décroissant)
    @GetMapping("/order/number")
    public List<Chambre> getChambresOrderByNumberDesc() {
        return chambreService.getChambresOrderByNumberDesc();
    }

    // Endpoint pour compter le nombre de chambres d'un type donné
    @GetMapping("/count/type/{type}")
    public long countChambresByType(@PathVariable String type) {
        return chambreService.countChambresByType(type);
    }

    // Endpoint pour vérifier si une chambre existe avec un numéro spécifique
    @GetMapping("/exists/number/{number}")
    public boolean chambreExistsByNumber(@PathVariable Integer number) {
        return chambreService.chambreExistsByNumber(number);
    }

    // Endpoint pour récupérer toutes les chambres ayant un prix compris entre deux valeurs
    @GetMapping("/price/between")
    public List<Chambre> getChambresByPriceBetween(@RequestParam Double minPrice, @RequestParam Double maxPrice) {
        return chambreService.getChambresByPriceBetween(minPrice, maxPrice);
    }

    // Endpoint pour récupérer tous les résidents associés à une chambre donnée
    @GetMapping("/residents/{chambreId}")
    public List<Resident> getResidentsByChambre(@PathVariable Integer chambreId) {
        return chambreService.getResidentsByChambre(chambreId);
    }

    // Endpoint pour ajouter ou mettre à jour une chambre
    @PostMapping("/")
    public Chambre saveChambre(@RequestBody Chambre chambre) {
        return chambreService.saveChambre(chambre);
    }



//obtient tous les chambreDTO 
    @GetMapping("/all")
     public List<ChambreDTO> getAllChambres() {
        return chambreService.getAllChambres();
    }


//obtient un chambreDTO par id
    @GetMapping("/{id}")
    public ChambreDTO getChambreById(@PathVariable("id") Integer id) {
        return chambreService.getChambreDetails(id);
    }

     @PostMapping("/add")
    public ResponseEntity<String> addChambre(@RequestBody Chambre chambre) {
        try {
            chambreService.addChambreWithAdmin(chambre);
            return ResponseEntity.ok("Chambre ajoutée avec succès !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'ajout de la chambre : " + e.getMessage());
        }
    }



    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteChambre(@PathVariable Integer id) {
        try {
            chambreService.deleteChambreWithResidentsAndIncidents(id);
            return ResponseEntity.ok("Chambre et résidents associés supprimés avec succès !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la suppression de la chambre : " + e.getMessage());
        }
    }



   
    
}
