package com.resismart.RESISMART.service;

import com.resismart.RESISMART.dto.PaymentDTO;
import com.resismart.RESISMART.models.Payment;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.repository.PaymentRepository;
import com.resismart.RESISMART.statistique.PaymentStats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Récupérer un paiement par son identifiant
 


    
 /**
     * Met à jour tous les paiements le 1er jour de chaque mois.
     */
    @Scheduled(cron = "0 0 0 1 * ?") // Exécuté le premier jour de chaque mois à minuit
    public void resetMonthlyPayments() {
        List<Payment> payments = paymentRepository.findAll();

        for (Payment payment : payments) {
            payment.setStatus("PendingPayment");
            payment.setIsSet(false);
        }

        paymentRepository.saveAll(payments);
    }




    @Scheduled(cron = "0 0 0 * * ?") // Exécuté tous les jours à minuit
    public void updateLatePayments() {
        List<Payment> payments = paymentRepository.findAll();

        for (Payment payment : payments) {
            if (!payment.getIsSet()) { // Seulement pour les paiements non réglés
                LocalDate paymentDate = payment.getDatePayment().toLocalDate();
                long daysDifference = ChronoUnit.DAYS.between(paymentDate, LocalDate.now());

                if (daysDifference > 6) { // Plus de 6 jours
                    payment.setStatus("LatePayment");
                }
            }
        }

        paymentRepository.saveAll(payments);
    }

    


    public void markPaymentAsPaid(Integer paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("Paiement introuvable"));

        // Vérifie si le résident paie le jour même
        LocalDate paymentDate = payment.getDatePayment().toLocalDate();
        if (ChronoUnit.DAYS.between(paymentDate, LocalDate.now()) == 0) {
            return; // Pas de changement si payé le même jour
        }

        // Met à jour le statut comme payé
        payment.markAsPaid();
        paymentRepository.save(payment);
    }










    // Récupérer tous les paiements effectués à une date spécifique
    public List<Payment> getPaymentsByDate(Date datePayment) {
        return paymentRepository.findByDatePayment(datePayment);
    }

    // Récupérer tous les paiements effectués entre deux dates
    public List<Payment> getPaymentsBetweenDates(Date startDate, Date endDate) {
        return paymentRepository.findByDatePaymentBetween(startDate, endDate);
    }

    // Récupérer tous les paiements dont le montant est inférieur ou égal à un montant donné
    public List<Payment> getPaymentsByAmountLessThanEqual(Double amount) {
        return paymentRepository.findByAmountLessThanEqual(amount);
    }

    // Récupérer tous les paiements dont le montant est compris entre deux valeurs
    public List<Payment> getPaymentsByAmountBetween(Double minAmount, Double maxAmount) {
        return paymentRepository.findByAmountBetween(minAmount, maxAmount);
    }

    // Récupérer tous les paiements triés par montant (ordre croissant)
    public List<Payment> getAllPaymentsOrderByAmountAsc() {
        return paymentRepository.findAllByOrderByAmountAsc();
    }

    // Récupérer tous les paiements triés par date de paiement (ordre décroissant)
    public List<Payment> getAllPaymentsOrderByDatePaymentDesc() {
        return paymentRepository.findAllByOrderByDatePaymentDesc();
    }

    // Récupérer tous les paiements par statut
    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.findByStatus(status);
    }

    // Récupérer tous les paiements non réglés (isSet = false)
    public List<Payment> getPaymentsNotSet() {
        return paymentRepository.findByIsSetFalse();
    }

    // Récupérer tous les paiements réglés (isSet = true)
    public List<Payment> getPaymentsSet() {
        return paymentRepository.findByIsSetTrue();
    }

    // Compter le nombre de paiements pour un résident donné
    public long countPaymentsByResident(Resident resident) {
        return paymentRepository.countByResident(resident);
    }

    // Vérifier si un paiement existe avec un identifiant spécifique
    public boolean existsPaymentById(Integer id) {
        return paymentRepository.existsById(id);
    }




        public List<PaymentDTO> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();

        // Convertir les Payment en PaymentDTO
        return payments.stream()
                       .map(PaymentDTO::new)
                       .collect(Collectors.toList());

                       
    }


    public List<PaymentDTO> getPaymentsByResident(Resident resident) {
        List<Payment> payments = paymentRepository.findByResident(resident);

        // Convertir les Payment en PaymentDTO
        return payments.stream()
        .map(PaymentDTO::new)
        .collect(Collectors.toList());
     
            }




    public PaymentStats getPaymentStatistics() {
        List<Payment> payments = paymentRepository.findAll();

        List<Double> completedPayments = payments.stream()
                .filter(payment -> "Paid".equals(payment.getStatus()))
                .map(Payment::getAmount)
                .collect(Collectors.toList());

        List<Double> pendingPayments = payments.stream()
                .filter(payment -> "PendingPayment".equals(payment.getStatus()))
                .map(Payment::getAmount)
                .collect(Collectors.toList());

        List<Double> latePayments = payments.stream()
                .filter(payment -> "LatePayment".equals(payment.getStatus()))
                .map(Payment::getAmount)
                .collect(Collectors.toList());

        return new PaymentStats(completedPayments, pendingPayments,latePayments);
    }












    


}
