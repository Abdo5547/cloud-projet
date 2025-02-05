package com.resismart.RESISMART.repository;


import com.resismart.RESISMART.models.PaymentHistorie;
import com.resismart.RESISMART.models.Resident;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentHistorieRepository extends JpaRepository<PaymentHistorie, Integer> {
    List<PaymentHistorie> findByResident(Resident resident);
}
 