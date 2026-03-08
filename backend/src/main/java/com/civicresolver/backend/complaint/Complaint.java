package com.civicresolver.backend.complaint;

import com.civicresolver.backend.user.User;
import com.civicresolver.backend.utils.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "complaints")
public class Complaint extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintCategory category;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status;

    private String location;

    private String imageUrl;

    // Citizen who created complaint
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    @JsonIgnore // prevent circular reference
    private User createdBy;

    // Admin/officer assigned (optional)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_officer_id")
    @JsonIgnore
    private User assignedOfficer;
}
