package com.civicresolver.backend.suggestion;

import com.civicresolver.backend.suggestion.dto.SuggestionRequestDTO;
import com.civicresolver.backend.suggestion.dto.SuggestionResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
public class SuggestionController {

    private final SuggestionService suggestionService;

    @PostMapping
    public ResponseEntity<SuggestionResponseDTO> createSuggestion(
            @Valid @RequestBody SuggestionRequestDTO dto,
            Authentication auth) {

        String email = auth.getName();
        return ResponseEntity.ok(suggestionService.createSuggestion(dto, email));
    }

    @GetMapping("/my")
    public ResponseEntity<List<SuggestionResponseDTO>> getMySuggestions(Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(suggestionService.getMySuggestions(email));
    }

    @GetMapping("/public")
    public ResponseEntity<List<SuggestionResponseDTO>> getPublicSuggestions() {
        return ResponseEntity.ok(suggestionService.getPublicSuggestions());
    }
}
