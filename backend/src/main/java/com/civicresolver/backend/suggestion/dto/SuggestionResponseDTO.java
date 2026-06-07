package com.civicresolver.backend.suggestion.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class SuggestionResponseDTO {
    private String id;
    private String title;
    private String category;
    private String description;
    private String area;
    private Double latitude;
    private Double longitude;
    private String createdByName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;
}
