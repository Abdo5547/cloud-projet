package com.resismart.RESISMART.service;

import com.resismart.RESISMART.dto.residentdto.CardDTO;
import com.resismart.RESISMART.models.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CardService {

    @Autowired
    private com.resismart.RESISMART.repository.CardRepository cardRepository;

    // Création ou mise à jour d'une carte
    public Card saveCard(Card card) {
        return cardRepository.save(card);
    }

    // Récupérer une carte par ID
    public Optional<Card> getCardById(Integer id) {
        return cardRepository.findById(id);
    }

    // Récupérer toutes les cartes
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    // Supprimer une carte
    public void deleteCard(Integer id) {
        cardRepository.deleteById(id);
    }



public List<CardDTO> getCardsByResidentId(Integer residentId) {
        List<Card> cards = cardRepository.findByResidentId(residentId);
        return cards.stream()
                    .map(card -> new CardDTO(card.getId(), card.getCardNumber(), 
                            card.getCardHolderName(), card.getExpirationDate(), card.getCvv()))
                    .collect(Collectors.toList());
    }
}
