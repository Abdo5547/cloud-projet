package com.resismart.RESISMART.controller;

import com.resismart.RESISMART.dto.PaymentDTO;
import com.resismart.RESISMART.dto.PaymentDTOv2;
import com.resismart.RESISMART.models.Payment;
import com.resismart.RESISMART.models.PaymentHistorie;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.repository.PaymentHistorieRepository;
import com.resismart.RESISMART.repository.PaymentRepository;
import com.resismart.RESISMART.repository.ResidentRepository;
import com.resismart.RESISMART.service.PaymentService;
import com.resismart.RESISMART.statistique.PaymentStats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;



    // Récupérer tous les paiements d'un résident spécifique

    // Récupérer tous les paiements effectués à une date spécifique
    @GetMapping("/date/{datePayment}")
    public List<Payment> getPaymentsByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date datePayment) {
        return paymentService.getPaymentsByDate(datePayment);
    }

    // Récupérer tous les paiements effectués entre deux dates
    @GetMapping("/date-range")
    public List<Payment> getPaymentsBetweenDates(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                 @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return paymentService.getPaymentsBetweenDates(startDate, endDate);
    }

    // Récupérer tous les paiements dont le montant est inférieur ou égal à un montant donné
    @GetMapping("/amount/less-than-equal/{amount}")
    public List<Payment> getPaymentsByAmountLessThanEqual(@PathVariable Double amount) {
        return paymentService.getPaymentsByAmountLessThanEqual(amount);
    }

    // Récupérer tous les paiements dont le montant est compris entre deux valeurs
    @GetMapping("/amount/range")
    public List<Payment> getPaymentsByAmountBetween(@RequestParam Double minAmount, @RequestParam Double maxAmount) {
        return paymentService.getPaymentsByAmountBetween(minAmount, maxAmount);
    }

    // Récupérer tous les paiements triés par montant (ordre croissant)
    @GetMapping("/sorted-by-amount")
    public List<Payment> getAllPaymentsOrderByAmountAsc() {
        return paymentService.getAllPaymentsOrderByAmountAsc();
    }

    // Récupérer tous les paiements triés par date de paiement (ordre décroissant)
    @GetMapping("/sorted-by-date")
    public List<Payment> getAllPaymentsOrderByDatePaymentDesc() {
        return paymentService.getAllPaymentsOrderByDatePaymentDesc();
    }

    // Récupérer tous les paiements par statut
    @GetMapping("/status/{status}")
    public List<Payment> getPaymentsByStatus(@PathVariable String status) {
        return paymentService.getPaymentsByStatus(status);
    }

    // Récupérer tous les paiements non réglés (isSet = false)
    @GetMapping("/not-set")
    public List<Payment> getPaymentsNotSet() {
        return paymentService.getPaymentsNotSet();
    }

    // Récupérer tous les paiements réglés (isSet = true)
    @GetMapping("/set")
    public List<Payment> getPaymentsSet() {
        return paymentService.getPaymentsSet();
    }

    // Compter le nombre de paiements pour un résident donné
    @GetMapping("/count/resident/{residentId}")
    public long countPaymentsByResident(@PathVariable Integer residentId) {
        Resident resident = new Resident();
        resident.setId(residentId);
        return paymentService.countPaymentsByResident(resident);
    }

    // Vérifier si un paiement existe avec un identifiant spécifique
    @GetMapping("/exists/{id}")
    public boolean existsPaymentById(@PathVariable Integer id) {
        return paymentService.existsPaymentById(id);
    }




    @GetMapping("/allpayments")
    public List<PaymentDTO> getAllPayments() {
        return paymentService.getAllPayments();
    }





    //recupere la liste des paiements d'un residant
    @GetMapping("/resident/{residentId}")
    public List<PaymentDTO> getPaymentsByResident(@PathVariable Integer residentId) {
        Resident resident = new Resident();
        resident.setId(residentId);  // Suppose qu'on a une méthode pour récupérer le résident par son ID
        return paymentService.getPaymentsByResident(resident);
    }





    @GetMapping("/statistiques")
    public Map<String, Object> getPaymentsStatistics() {
        PaymentStats paymentStats = paymentService.getPaymentStatistics();
        Map<String, Object> stats = new HashMap<>();
        stats.put("completedPayments", paymentStats.getCompletedPayments());
        stats.put("pendingPayments", paymentStats.getPendingPayments());
        stats.put("LatePayments", paymentStats.getLatePayments());  // Ajout des paiements en retard
        return stats;
    }





    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ResidentRepository residentRepository;


    @Autowired
    private PaymentHistorieRepository paymentHistorieRepository;



    @PutMapping("/update/{residentId}")
    public String updatePaymentStatus(@PathVariable Integer residentId, @RequestBody PaymentDTOv2 paymentDTO) {
        // Vérifier si le résident existe
        Resident resident = residentRepository.findById(residentId).orElse(null);
        if (resident == null) {
            return "Resident not found";
        }

        // Chercher tous les paiements du résident
        List<Payment> payments = paymentRepository.findByResident(resident);
        if (payments.isEmpty()) {
            return "No payments found for the resident";
        }

        // Mettre à jour le premier paiement trouvé (ou choisir selon un critère spécifique)
        Payment paymentToUpdate = payments.get(0); // Par exemple, on prend le premier paiement trouvé
        if (paymentDTO.getStatus() != null) {
            paymentToUpdate.setStatus(paymentDTO.getStatus());
        }

        // Sauvegarder les modifications
        paymentRepository.save(paymentToUpdate);


         PaymentHistorie paymentHistorie = new PaymentHistorie();
         paymentHistorie.setResident(resident);
         paymentHistorie.setDatePayment(new java.sql.Date(System.currentTimeMillis())); // Date actuelle

          // Sauvegarder l'historique du paiement
          paymentHistorieRepository.save(paymentHistorie);

            // Vérification du stockage
         if (paymentHistorie.getId() == null) {
            return "Failed to save payment history";
         }

        return "Payment status updated successfully";
    }








 @PostMapping("/{id}/pay")
    public ResponseEntity<String> pay(@PathVariable("id") Integer paymentId) {
        try {
            paymentService.markPaymentAsPaid(paymentId);
            return ResponseEntity.ok("Paiement mis à jour avec succès.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
