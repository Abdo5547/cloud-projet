package com.resismart.RESISMART.controller;

import com.resismart.RESISMART.dto.residentdto.CardDTO;
import com.resismart.RESISMART.models.Card;
import com.resismart.RESISMART.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    // Créer ou mettre à jour une carte
    @PostMapping("/add")
    public ResponseEntity<Card> createOrUpdateCard(@RequestBody Card card) {
        Card savedCard = cardService.saveCard(card);
        return new ResponseEntity<>(savedCard, HttpStatus.CREATED);
    }

    // Récupérer toutes les cartes
    @GetMapping("/resident/{id}")
    public List<CardDTO> getCardsByResidentId(@PathVariable Integer id) {
        return cardService.getCardsByResidentId(id);
    }
    // Récupérer une carte par ID
    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Integer id) {
        Optional<Card> card = cardService.getCardById(id);
        if (card.isPresent()) {
            return new ResponseEntity<>(card.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Supprimer une carte
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Integer id) {
        Optional<Card> card = cardService.getCardById(id);
        if (card.isPresent()) {
            cardService.deleteCard(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
