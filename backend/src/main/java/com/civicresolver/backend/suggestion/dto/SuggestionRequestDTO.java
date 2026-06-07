package com.civicresolver.backend.suggestion.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuggestionRequestDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String category;

    @NotBlank
    private String description;

    @NotBlank
    private String area;

    private Double latitude;

    private Double longitude;
}
