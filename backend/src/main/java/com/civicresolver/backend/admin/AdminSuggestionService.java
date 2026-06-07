package com.civicresolver.backend.admin;

import com.civicresolver.backend.admin.dto.UpdateSuggestionStatusDTO;
import com.civicresolver.backend.suggestion.Suggestion;
import com.civicresolver.backend.suggestion.SuggestionRepository;
import com.civicresolver.backend.suggestion.SuggestionStatus;
import com.civicresolver.backend.suggestion.dto.SuggestionResponseDTO;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminSuggestionService {

    private final SuggestionRepository suggestionRepository;
    private final UserRepository userRepository;

    public List<SuggestionResponseDTO> getAllSuggestions() {
        return suggestionRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public SuggestionResponseDTO updateStatus(String suggestionId, UpdateSuggestionStatusDTO dto) {
        Suggestion suggestion = suggestionRepository.findById(suggestionId)
                .orElseThrow(() -> new RuntimeException("Suggestion not found"));

        suggestion.setStatus(dto.getStatus());
        Suggestion saved = suggestionRepository.save(suggestion);
        return mapToDTO(saved);
    }

    private SuggestionResponseDTO mapToDTO(Suggestion s) {
        String createdByName = userRepository.findById(s.getCreatedById())
                .map(User::getName)
                .orElse("Unknown User");

        String status = (s.getStatus() != null ? s.getStatus() : SuggestionStatus.NEW).name();

        return SuggestionResponseDTO.builder()
                .id(s.getId())
                .title(s.getTitle())
                .category(s.getCategory().name())
                .description(s.getDescription())
                .area(s.getArea())
                .latitude(s.getLatitude())
                .longitude(s.getLongitude())
                .createdByName(createdByName)
                .createdAt(s.getCreatedAt())
                .updatedAt(s.getUpdatedAt())
                .status(status)
                .build();
    }
}
