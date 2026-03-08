package com.civicresolver.backend.analytics;

import com.civicresolver.backend.complaint.ComplaintStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminAnalyticsService {

    // Mock dashboard data
    public Map<String, Long> getStatusSummary() {
        Map<String, Long> statusMap = new HashMap<>();
        statusMap.put(ComplaintStatus.PENDING.name(), 5L);
        statusMap.put(ComplaintStatus.ONGOING.name(), 3L);
        statusMap.put(ComplaintStatus.RESOLVED.name(), 7L);
        return statusMap;
    }

    // Mock monthly complaints data
    public Map<String, Long> getMonthlySummary() {
        Map<String, Long> monthlyMap = new HashMap<>();
        monthlyMap.put("Jan", 10L);
        monthlyMap.put("Feb", 8L);
        monthlyMap.put("Mar", 12L);
        monthlyMap.put("Apr", 5L);
        return monthlyMap;
    }

    // Mock dashboard overview
    public Map<String, Object> getDashboardSummary() {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalComplaints", 15);
        dashboard.put("pending", 5);
        dashboard.put("ongoing", 3);
        dashboard.put("resolved", 7);
        dashboard.put("newUsers", 4);
        return dashboard;
    }
}
