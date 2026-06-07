package com.civicresolver.backend.complaint;

import com.civicresolver.backend.complaint.dto.ComplaintRequestDTO;
import com.civicresolver.backend.complaint.dto.ComplaintResponseDTO;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    // Create a complaint
    public ComplaintResponseDTO createComplaint(ComplaintRequestDTO dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Complaint complaint = Complaint.builder()
                .title(dto.getTitle())
                // 🔧 FIX: Convert String → Enum
                .category(ComplaintCategory.valueOf(dto.getCategory()))
                .description(dto.getDescription())
                .location(dto.getLocation())
                .imageUrl(dto.getImageUrl())
                .status(ComplaintStatus.PENDING)
                .createdById(user.getId())
                .build();

        Complaint saved = complaintRepository.save(complaint);
        return mapToDTO(saved);
    }

    // Get all complaints created by the citizen
    public List<ComplaintResponseDTO> getMyComplaints(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return complaintRepository.findByCreatedByIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // Get a single complaint by ID
    public ComplaintResponseDTO getComplaint(String id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        return mapToDTO(complaint);
    }

    // Get all public complaints (for gallery)
    public List<ComplaintResponseDTO> getPublicComplaints() {
        return complaintRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // Mapping entity -> DTO
    private ComplaintResponseDTO mapToDTO(Complaint c) {
        String createdByName = userRepository.findById(c.getCreatedById())
                .map(User::getName)
                .orElse("Unknown User");

        return ComplaintResponseDTO.builder()
                .id(c.getId())
                .title(c.getTitle())
                .category(c.getCategory().name()) // <- convert enum to String
                .description(c.getDescription())
                .status(c.getStatus())
                .location(c.getLocation())
                .imageUrl(c.getImageUrl())
                .createdByName(createdByName)
                .createdAt(c.getCreatedAt())
                .build();
    }

}
