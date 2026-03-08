package com.civicresolver.backend.complaint.dto;

import com.civicresolver.backend.complaint.ComplaintStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ComplaintResponseDTO {

    private Long id;
    private String title;

    @Schema(description = "Category of the complaint", example = "ROAD")
    private String category;

    private String description;
    private ComplaintStatus status;
    private String location;
    private String imageUrl;
    private String createdByName;
    private LocalDateTime createdAt;
}
