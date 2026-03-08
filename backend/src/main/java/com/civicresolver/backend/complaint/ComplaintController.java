package com.civicresolver.backend.complaint;

import com.civicresolver.backend.complaint.dto.ComplaintRequestDTO;
import com.civicresolver.backend.complaint.dto.ComplaintResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    // Create a complaint (Citizen only)
    @PostMapping
    public ResponseEntity<ComplaintResponseDTO> createComplaint(
            @Valid @RequestBody ComplaintRequestDTO dto,
            Authentication auth) {

        String email = auth.getName();
        return ResponseEntity.ok(complaintService.createComplaint(dto, email));
    }

    // Get complaints of the logged-in citizen
    @GetMapping("/my")
    public ResponseEntity<List<ComplaintResponseDTO>> getMyComplaints(Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(complaintService.getMyComplaints(email));
    }

    // Get single complaint
    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponseDTO> getComplaint(@PathVariable Long id) {
        return ResponseEntity.ok(complaintService.getComplaint(id));
    }

    // Public complaints (gallery)
    @GetMapping("/public")
    public ResponseEntity<List<ComplaintResponseDTO>> getPublicComplaints() {
        return ResponseEntity.ok(complaintService.getPublicComplaints());
    }
}
