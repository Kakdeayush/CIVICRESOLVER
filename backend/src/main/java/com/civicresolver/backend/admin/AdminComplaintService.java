package com.civicresolver.backend.admin;

import com.civicresolver.backend.admin.dto.AssignRequestDTO;
import com.civicresolver.backend.admin.dto.UpdateStatusDTO;
import com.civicresolver.backend.admin.dto.DashboardResponseDTO;
import com.civicresolver.backend.complaint.Complaint;
import com.civicresolver.backend.complaint.ComplaintRepository;
import com.civicresolver.backend.complaint.ComplaintStatus;
import com.civicresolver.backend.complaint.dto.ComplaintResponseDTO;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    // Get all complaints
    public List<ComplaintResponseDTO> getAllComplaints() {
        return complaintRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Update complaint status
    public ComplaintResponseDTO updateStatus(Long complaintId, UpdateStatusDTO dto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(dto.getStatus());
        return mapToDTO(complaint);
    }

    // Assign officer
    public ComplaintResponseDTO assignOfficer(Long complaintId, AssignRequestDTO dto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        User officer = userRepository.findById(dto.getOfficerId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        complaint.setAssignedOfficer(officer);
        return mapToDTO(complaint);
    }

    // Dashboard analytics (mockable)
    public DashboardResponseDTO getDashboard() {
        List<Complaint> complaints = complaintRepository.findAll();

        Map<ComplaintStatus, Long> statusCounts = complaints.stream()
                .collect(Collectors.groupingBy(Complaint::getStatus, Collectors.counting()));

        Map<String, Long> monthlyCounts = new HashMap<>();
        for (Complaint c : complaints) {
            String month = c.getCreatedAt().getMonth().name();
            monthlyCounts.put(month, monthlyCounts.getOrDefault(month, 0L) + 1);
        }

        return DashboardResponseDTO.builder()
                .totalComplaints((long) complaints.size())
                .pending(statusCounts.getOrDefault(ComplaintStatus.PENDING, 0L))
                .ongoing(statusCounts.getOrDefault(ComplaintStatus.ONGOING, 0L))
                .resolved(statusCounts.getOrDefault(ComplaintStatus.RESOLVED, 0L))
                .monthlyCounts(monthlyCounts)
                .build();
    }
    private ComplaintResponseDTO mapToDTO(Complaint c) {
        return ComplaintResponseDTO.builder()
                .id(c.getId())
                .title(c.getTitle())
                .category(c.getCategory().name()) // <- convert enum to String
                .description(c.getDescription())
                .status(c.getStatus())
                .location(c.getLocation())
                .imageUrl(c.getImageUrl())
                .createdByName(c.getCreatedBy().getName())
                .createdAt(c.getCreatedAt())
                .build();
    }


}
