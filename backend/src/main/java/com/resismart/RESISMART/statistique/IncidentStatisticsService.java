package com.resismart.RESISMART.statistique;

import org.springframework.stereotype.Service;

@Service
public class IncidentStatisticsService {

    private final com.resismart.RESISMART.repository.IncidentRepository incidentRepository;

    public IncidentStatisticsService(com.resismart.RESISMART.repository.IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public long getPlumbingIncidents() {
        return incidentRepository.countPlumbingIncidents();
    }

    public long getElectricityIncidents() {
        return incidentRepository.countElectricityIncidents();
    }

    public long getAirConditioningAndHeatingIncidents() {
        return incidentRepository.countAirConditioningAndHeatingIncidents();
    }

    public long getSecurityAndVentilationIncidents() {
        return incidentRepository.countSecurityAndVentilationIncidents();
    }

    public long getStructureIncidents() {
        return incidentRepository.countStructureIncidents();
    }

    public long getOtherIncidents() {
        return incidentRepository.countOtherIncidents();
    }

    public long getTotalIncidents() {
        return incidentRepository.count();
    }
}
