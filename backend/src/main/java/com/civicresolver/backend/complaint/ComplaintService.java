package com.civicresolver.backend.complaint;

import com.civicresolver.backend.complaint.dto.ComplaintRequestDTO;
import com.civicresolver.backend.complaint.dto.ComplaintResponseDTO;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
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
                .createdBy(user)
                .build();

        Complaint saved = complaintRepository.save(complaint);
        return mapToDTO(saved);
    }

    // Get all complaints created by the citizen
    public List<ComplaintResponseDTO> getMyComplaints(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return complaintRepository.findByCreatedBy(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Get a single complaint by ID
    public ComplaintResponseDTO getComplaint(Long id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        return mapToDTO(complaint);
    }

    // Get all public complaints (for gallery)
    public List<ComplaintResponseDTO> getPublicComplaints() {
        return complaintRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Mapping entity -> DTO
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
