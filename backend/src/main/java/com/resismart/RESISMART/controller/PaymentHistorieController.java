package com.resismart.RESISMART.controller;

import com.resismart.RESISMART.dto.PaymentHistorieDTO;
import com.resismart.RESISMART.service.PaymentHistorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paymenthistorie")
public class PaymentHistorieController {

    @Autowired
    private PaymentHistorieService paymentHistorieService;

    // Endpoint pour récupérer l'historique des paiements d'un résident par ID
    @GetMapping("/resident/{residentId}")
    @ResponseStatus(HttpStatus.OK)
    public List<PaymentHistorieDTO> getPaymentHistorieByResidentId(@PathVariable Integer residentId) {
        return paymentHistorieService.getPaymentHistorieByResidentId(residentId);
    }
}
