package com.resismart.RESISMART.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.resismart.RESISMART.models.Incident;

import java.util.Date;
import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Integer> {

    // Trouver tous les incidents non résolus
    List<Incident> findByIsResolvedFalse();

    // Trouver tous les incidents résolus
    List<Incident> findByIsResolvedTrue();

    // Compter le nombre d'incidents non résolus
    long countByIsResolvedFalse();

    // Compter le nombre d'incidents résolus
    long countByIsResolvedTrue();

    // Trouver tous les incidents d'une chambre spécifique
    List<Incident> findByChambreId(Integer chambreId);

    // Trouver tous les incidents attribués à un technicien spécifique
    List<Incident> findByTechnicienId(Integer technicienId);

    // Trouver tous les incidents signalés après une date donnée
    List<Incident> findByDateAlertAfter(Date date);

    // Trouver tous les incidents signalés avant une date donnée
    List<Incident> findByDateAlertBefore(Date date);

    // Trouver tous les incidents signalés dans une période donnée
    List<Incident> findByDateAlertBetween(Date startDate, Date endDate);

    // Trouver tous les incidents résolus triés par date de résolution (ordre croissant)
    List<Incident> findByIsResolvedTrueOrderByDateResolvedAsc();

    // Trouver tous les incidents non résolus triés par date d'alerte (ordre décroissant)
    List<Incident> findByIsResolvedFalseOrderByDateAlertDesc();

    long countByIsResolved(boolean isResolved);


    // Vérifier si un incident non résolu existe pour une chambre donnée
    boolean existsByChambreIdAndIsResolvedFalse(Integer chambreId);


 // Trouver tous les incidents associés à unresident donné
 List<Incident> findByResidentId(Integer residentId);







       // Comptage des incidents par description (par type)
       @Query("SELECT COUNT(i) FROM Incident i WHERE i.description LIKE %:type%")
       long countIncidentsByDescription(String type);
   
       // Comptage des incidents pour chaque type spécifique
       @Query("SELECT COUNT(i) FROM Incident i WHERE i.description LIKE '%Plumbing%'")
       long countPlumbingIncidents();
   
       @Query("SELECT COUNT(i) FROM Incident i WHERE i.description LIKE '%Electricity'")
       long countElectricityIncidents();
   
       @Query("SELECT COUNT(i) FROM Incident i WHERE i.description LIKE '%AirConditioningAndHeating'")
       long countAirConditioningAndHeatingIncidents();
   
       @Query("SELECT COUNT(i) FROM Incident i WHERE i.description LIKE '%SecurityAndVentilation%'")
       long countSecurityAndVentilationIncidents();
   
       @Query("SELECT COUNT(i) FROM Incident i WHERE i.description LIKE '%Structure%'")
       long countStructureIncidents();
   
       @Query("SELECT COUNT(i) FROM Incident i WHERE i.description LIKE '%Autre%'")
       long countOtherIncidents();
}
