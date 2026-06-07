package com.civicresolver.backend.admin.dto;

import com.civicresolver.backend.suggestion.SuggestionStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateSuggestionStatusDTO {
    @NotNull
    private SuggestionStatus status;
}
