package com.civicresolver.backend.admin.dto;

import com.civicresolver.backend.complaint.ComplaintStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStatusDTO {
    @NotNull
    private ComplaintStatus status;
}
