package com.resismart.RESISMART.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Chambre;
import com.resismart.RESISMART.models.Resident;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChambreRepository extends JpaRepository<Chambre, Integer> {

    // Trouver une chambre par son numéro
    Optional<Chambre> findByNumber(Integer number);

    // Trouver toutes les chambres d'un type spécifique
    List<Chambre> findByType(String type);

    // Trouver toutes les chambres disponibles (statut = "disponible")
    List<Chambre> findByStatus(String status);

    // Trouver toutes les chambres gérées par un administrateur spécifique
    List<Chambre> findByAdmin(Admin admin);

    // Trouver toutes les chambres avec un prix inférieur ou égal à un montant donné
    List<Chambre> findByPriceLessThanEqual(Double price);

    // Trouver toutes les chambres triées par prix (ordre croissant)
    List<Chambre> findAllByOrderByPriceAsc();

    // Trouver toutes les chambres triées par numéro (ordre décroissant)
    List<Chambre> findAllByOrderByNumberDesc();

    // Compter le nombre de chambres d'un type donné
    long countByType(String type);

    // Vérifier si une chambre existe avec un numéro spécifique
    boolean existsByNumber(Integer number);

    // Trouver toutes les chambres ayant un prix compris entre deux valeurs
    List<Chambre> findByPriceBetween(Double minPrice, Double maxPrice);

    // Trouver tous les résidents associés à une chambre donnée
    List<Resident> findResidentsById(Integer chambre);





      // Nombre total de chambres
    @Query("SELECT COUNT(c) FROM Chambre c")
    long countTotalChambres();

    // Nombre de chambres occupées
    @Query("SELECT COUNT(c) FROM Chambre c WHERE c.status = 'Occupied'")
    long countOccupiedChambres();

    // Nombre de chambres disponibles
    @Query("SELECT COUNT(c) FROM Chambre c WHERE c.status = 'Available'")
    long countAvailableChambres();
 







      @Query("SELECT c FROM Chambre c WHERE c.type = :type AND c.numberResidentPossible > c.numberCurent")
    List<Chambre> findAvailableChambresByType(@Param("type") String type);
}
