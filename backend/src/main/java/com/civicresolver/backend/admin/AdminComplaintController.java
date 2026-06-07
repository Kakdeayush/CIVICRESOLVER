package com.civicresolver.backend.admin;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.civicresolver.backend.admin.dto.AssignRequestDTO;
import com.civicresolver.backend.admin.dto.DashboardResponseDTO;
import com.civicresolver.backend.admin.dto.DayWiseReportDTO;
import com.civicresolver.backend.admin.dto.MonthWiseReportDTO;
import com.civicresolver.backend.admin.dto.UpdateStatusDTO;
import com.civicresolver.backend.admin.dto.WeekWiseReportDTO;
import com.civicresolver.backend.complaint.dto.ComplaintResponseDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") // Only admin can access
public class AdminComplaintController {

    private final AdminComplaintService adminService;

    // List all complaints
    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintResponseDTO>> getAllComplaints() {
        return ResponseEntity.ok(adminService.getAllComplaints());
    }

    // Update status
    @PutMapping("/complaints/{id}/status")
    public ResponseEntity<ComplaintResponseDTO> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateStatusDTO dto) {
        return ResponseEntity.ok(adminService.updateStatus(id, dto));
    }

    // Assign officer
    @PutMapping("/complaints/{id}/assign")
    public ResponseEntity<ComplaintResponseDTO> assignOfficer(
            @PathVariable String id,
            @Valid @RequestBody AssignRequestDTO dto) {
        return ResponseEntity.ok(adminService.assignOfficer(id, dto));
    }

    // Dashboard analytics
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDTO> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    // Day-wise report
    @GetMapping("/reports/day-wise")
    public ResponseEntity<DayWiseReportDTO> getDayWiseReport(
            @RequestParam(value = "date", required = false) String dateStr) {
        LocalDate date = dateStr != null ? LocalDate.parse(dateStr) : LocalDate.now();
        return ResponseEntity.ok(adminService.getDayWiseReport(date));
    }

    // Week-wise report
    @GetMapping("/reports/week-wise")
    public ResponseEntity<WeekWiseReportDTO> getWeekWiseReport(
            @RequestParam(value = "date", required = false) String dateStr) {
        LocalDate date = dateStr != null ? LocalDate.parse(dateStr) : LocalDate.now();
        return ResponseEntity.ok(adminService.getWeekWiseReport(date));
    }

    // Month-wise report
    @GetMapping("/reports/month-wise")
    public ResponseEntity<MonthWiseReportDTO> getMonthWiseReport(
            @RequestParam("year") Integer year,
            @RequestParam("month") Integer month) {
        return ResponseEntity.ok(adminService.getMonthWiseReport(year, month));
    }
}
