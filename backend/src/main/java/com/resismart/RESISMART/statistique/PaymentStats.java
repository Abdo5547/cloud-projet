package com.resismart.RESISMART.statistique;

import java.util.List;

public class PaymentStats {

    private List<Double> completedPayments;
    private List<Double> pendingPayments;
    private List<Double> latePayments;  // Ajout de la liste pour les paiements en retard

    // Constructeur
    public PaymentStats(List<Double> completedPayments, List<Double> pendingPayments, List<Double> latePayments) {
        this.completedPayments = completedPayments;
        this.pendingPayments = pendingPayments;
        this.latePayments = latePayments;  // Initialisation des paiements en retard
    }

    // Getters et Setters
    public List<Double> getCompletedPayments() {
        return completedPayments;
    }

    public void setCompletedPayments(List<Double> completedPayments) {
        this.completedPayments = completedPayments;
    }

    public List<Double> getPendingPayments() {
        return pendingPayments;
    }

    public void setPendingPayments(List<Double> pendingPayments) {
        this.pendingPayments = pendingPayments;
    }

    public List<Double> getLatePayments() {
        return latePayments;  // Getter pour les paiements en retard
    }

    public void setLatePayments(List<Double> latePayments) {
        this.latePayments = latePayments;  // Setter pour les paiements en retard
    }
}
