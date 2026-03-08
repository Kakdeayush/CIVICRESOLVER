package com.civicresolver.backend.admin.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignRequestDTO {
    @NotNull
    private Long officerId; // Admin user to assign
}
