package com.civicresolver.backend.admin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignRequestDTO {
    @NotBlank
    private String officerId; // Admin user to assign
}
