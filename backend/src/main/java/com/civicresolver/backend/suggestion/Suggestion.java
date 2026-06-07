package com.civicresolver.backend.suggestion;

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
@Document(collection = "suggestions")
public class Suggestion extends BaseEntity {

    @Id
    private String id;

    @NotBlank
    private String title;

    private SuggestionCategory category;

    @NotBlank
    private String description;

    @NotBlank
    private String area;

    private Double latitude;

    private Double longitude;

    private String createdById;

    private SuggestionStatus status;
}
