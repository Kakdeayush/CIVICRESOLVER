package com.civicresolver.backend.admin;

import com.civicresolver.backend.admin.dto.AssignRequestDTO;
import com.civicresolver.backend.admin.dto.UpdateStatusDTO;
import com.civicresolver.backend.admin.dto.DashboardResponseDTO;
import com.civicresolver.backend.complaint.dto.ComplaintResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

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
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusDTO dto) {
        return ResponseEntity.ok(adminService.updateStatus(id, dto));
    }

    // Assign officer
    @PutMapping("/complaints/{id}/assign")
    public ResponseEntity<ComplaintResponseDTO> assignOfficer(
            @PathVariable Long id,
            @Valid @RequestBody AssignRequestDTO dto) {
        return ResponseEntity.ok(adminService.assignOfficer(id, dto));
    }

    // Dashboard analytics
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDTO> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }
}
