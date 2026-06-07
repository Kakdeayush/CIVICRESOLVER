package com.civicresolver.backend.admin;

import com.civicresolver.backend.admin.dto.UpdateSuggestionStatusDTO;
import com.civicresolver.backend.suggestion.dto.SuggestionResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/suggestions")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminSuggestionController {

    private final AdminSuggestionService adminSuggestionService;

    @GetMapping
    public ResponseEntity<List<SuggestionResponseDTO>> getAllSuggestions() {
        return ResponseEntity.ok(adminSuggestionService.getAllSuggestions());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SuggestionResponseDTO> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateSuggestionStatusDTO dto) {
        return ResponseEntity.ok(adminSuggestionService.updateStatus(id, dto));
    }
}
