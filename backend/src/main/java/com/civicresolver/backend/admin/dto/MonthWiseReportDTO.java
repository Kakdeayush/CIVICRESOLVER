package com.civicresolver.backend.admin.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthWiseReportDTO {
    private Integer year;
    private Integer month; // 1-12
    private String monthName; // e.g., "January", "February"
    private Long totalComplaints;
    private List<UserComplaintCountDTO> topUsers;
    private List<AreaComplaintCountDTO> topAreas;
}
