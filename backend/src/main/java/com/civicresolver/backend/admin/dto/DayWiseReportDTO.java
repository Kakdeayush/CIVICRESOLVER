package com.civicresolver.backend.admin.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DayWiseReportDTO {
    private LocalDate date;
    private Long totalComplaints;
    private List<UserComplaintCountDTO> topUsers;
    private List<AreaComplaintCountDTO> topAreas;
}
