package com.civicresolver.backend.complaint.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintRequestDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String category; // we keep String so frontend can send enum name

    @NotBlank
    private String description;

    @NotBlank
    private String location;

    private String imageUrl;
}
