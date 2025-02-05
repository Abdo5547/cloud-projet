package com.resismart.RESISMART.statistique;

import org.springframework.stereotype.Service;

import com.resismart.RESISMART.repository.ChambreRepository;

@Service
public class ChambreStatisticsService {

    private final com.resismart.RESISMART.repository.ChambreRepository chambreRepository;

    public ChambreStatisticsService(ChambreRepository chambreRepository) {
        this.chambreRepository = chambreRepository;
    }

    // Récupère le nombre total de chambres
    public long getTotalChambres() {
        return chambreRepository.countTotalChambres();
    }

    // Récupère le nombre de chambres occupées
    public long getOccupiedChambres() {
        return chambreRepository.countOccupiedChambres();
    }

    // Récupère le nombre de chambres disponibles
    public long getAvailableChambres() {
        return chambreRepository.countAvailableChambres();
    }

    // Calcule le taux d'occupation des chambres
    public double getOccupancyRate() {
        long occupied = getOccupiedChambres();
        long total = occupied + getAvailableChambres();
        return total == 0 ? 0 : (double) occupied / total * 100;
    }
}
