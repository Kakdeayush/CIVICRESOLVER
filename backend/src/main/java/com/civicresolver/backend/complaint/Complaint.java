package com.civicresolver.backend.complaint;

import com.civicresolver.backend.utils.BaseEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "complaints")
public class Complaint extends BaseEntity {

    @Id
    private String id;

    @NotBlank
    private String title;

    private ComplaintCategory category;

    @NotBlank
    private String description;

    private ComplaintStatus status;

    private String location;

    private String imageUrl;

    private String createdById;

    private String assignedOfficerId;
}
