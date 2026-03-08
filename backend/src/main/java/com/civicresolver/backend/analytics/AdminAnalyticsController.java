package com.civicresolver.backend.analytics;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AdminAnalyticsController {

    private final AdminAnalyticsService analyticsService;

    // Dashboard summary
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(analyticsService.getDashboardSummary());
    }

    // Complaint status summary
    @GetMapping("/status")
    public ResponseEntity<Map<String, Long>> getStatusSummary() {
        return ResponseEntity.ok(analyticsService.getStatusSummary());
    }

    // Monthly complaints summary
    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Long>> getMonthlySummary() {
        return ResponseEntity.ok(analyticsService.getMonthlySummary());
    }
}
