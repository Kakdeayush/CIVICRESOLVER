package com.civicresolver.backend.suggestion;

import com.civicresolver.backend.suggestion.dto.SuggestionRequestDTO;
import com.civicresolver.backend.suggestion.dto.SuggestionResponseDTO;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SuggestionService {

    private final SuggestionRepository suggestionRepository;
    private final UserRepository userRepository;

    public SuggestionResponseDTO createSuggestion(SuggestionRequestDTO dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SuggestionCategory category;
        try {
            category = SuggestionCategory.valueOf(dto.getCategory().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid suggestion category");
        }

        Suggestion suggestion = Suggestion.builder()
                .title(dto.getTitle())
                .category(category)
                .description(dto.getDescription())
                .area(dto.getArea())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .createdById(user.getId())
                .status(SuggestionStatus.NEW)
                .build();

        Suggestion saved = suggestionRepository.save(suggestion);
        return mapToDTO(saved);
    }

    public List<SuggestionResponseDTO> getMySuggestions(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return suggestionRepository.findByCreatedByIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public List<SuggestionResponseDTO> getPublicSuggestions() {
        return suggestionRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
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
                .status(status)
                .build();
    }
}
