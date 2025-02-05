package com.resismart.RESISMART.repository;

import com.resismart.RESISMART.dto.chambredto.ChambreDTO;
import com.resismart.RESISMART.models.Card;
import com.resismart.RESISMART.models.Chambre;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {

    List<Card> findByResidentId(Integer residentId);

}
