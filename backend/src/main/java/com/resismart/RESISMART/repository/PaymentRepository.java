package com.resismart.RESISMART.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.resismart.RESISMART.models.Payment;
import com.resismart.RESISMART.models.Resident;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // Trouver un paiement par son identifiant
    Optional<Payment> findById(Integer id);

    // Trouver tous les paiements associés à un résident spécifique
    List<Payment> findByResident(Resident resident);

    // Trouver tous les paiements associés à un résident spécifique par son ID
    List<Payment> findByResidentId(Integer residentId);

    // Trouver tous les paiements effectués à une date spécifique
    List<Payment> findByDatePayment(Date datePayment);

    // Trouver tous les paiements effectués entre deux dates
    List<Payment> findByDatePaymentBetween(Date startDate, Date endDate);

    // Trouver tous les paiements dont le montant est inférieur ou égal à un montant donné
    List<Payment> findByAmountLessThanEqual(Double amount);

    // Trouver tous les paiements dont le montant est compris entre deux valeurs
    List<Payment> findByAmountBetween(Double minAmount, Double maxAmount);

    // Compter le nombre de paiements pour un résident donné
    long countByResident(Resident resident);

    // Vérifier si un paiement existe avec un identifiant spécifique
    boolean existsById(Integer id);

    // Trouver tous les paiements triés par montant (ordre croissant)
    List<Payment> findAllByOrderByAmountAsc();

    // Trouver tous les paiements triés par date de paiement (ordre décroissant)
    List<Payment> findAllByOrderByDatePaymentDesc();

    // Trouver tous les paiements par statut
    List<Payment> findByStatus(String status);

    // Trouver tous les paiements non réglés (isSet = false)
    List<Payment> findByIsSetFalse();

    // Trouver tous les paiements réglés (isSet = true)
    List<Payment> findByIsSetTrue();




    @Transactional
    @Modifying
    @Query("UPDATE Payment p SET p.status = CASE " +
           "WHEN DATEDIFF(CURRENT_DATE, p.datePayment) > 6 THEN 'LatePayment' " +
           "WHEN DATEDIFF(CURRENT_DATE, p.datePayment) BETWEEN 1 AND 5 THEN 'PendingPayment' " +
           "ELSE 'Paid' END")
    void updatePaymentsStatus();
}
