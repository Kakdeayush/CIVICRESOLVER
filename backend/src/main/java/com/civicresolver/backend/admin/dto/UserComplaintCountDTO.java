package com.civicresolver.backend.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserComplaintCountDTO {
    private String userId;
    private String userName;
    private Long complaintCount;
}
