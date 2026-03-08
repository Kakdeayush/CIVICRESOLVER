package com.civicresolver.backend.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@Builder
public class DashboardResponseDTO {
    private Long totalComplaints;
    private Long pending;
    private Long ongoing;
    private Long resolved;
    private Map<String, Long> monthlyCounts;
}
