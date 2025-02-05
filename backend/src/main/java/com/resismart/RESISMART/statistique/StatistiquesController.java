package com.resismart.RESISMART.statistique;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/statistiques")
public class StatistiquesController {

    private final ChambreStatisticsService chambreStatisticsService;

    private final IncidentStatisticsService incidentStatisticsService;

    public StatistiquesController(ChambreStatisticsService chambreStatisticsService, IncidentStatisticsService incidentStatisticsService) {
        this.chambreStatisticsService = chambreStatisticsService;
        this.incidentStatisticsService = incidentStatisticsService;
    }

    @GetMapping("/ov")
    public Map<String, Object> getChambreStatisticsOverview() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalChambres", chambreStatisticsService.getTotalChambres());
        stats.put("occupiedChambres", chambreStatisticsService.getOccupiedChambres());
        stats.put("availableChambres", chambreStatisticsService.getAvailableChambres());
        stats.put("occupancyRate", chambreStatisticsService.getOccupancyRate());
        return stats;
    }



    @GetMapping("/repartition")
    public Map<String, Object> getIncidentRepartition() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("plumbing", incidentStatisticsService.getPlumbingIncidents());
        stats.put("electricity", incidentStatisticsService.getElectricityIncidents());
        stats.put("airConditioningAndHeating", incidentStatisticsService.getAirConditioningAndHeatingIncidents());
        stats.put("securityAndVentilation", incidentStatisticsService.getSecurityAndVentilationIncidents());
        stats.put("structure", incidentStatisticsService.getStructureIncidents());
        stats.put("others", incidentStatisticsService.getOtherIncidents());
        stats.put("total", incidentStatisticsService.getTotalIncidents());
        return stats;
    }


}

