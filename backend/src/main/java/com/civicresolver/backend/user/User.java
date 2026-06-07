package com.civicresolver.backend.user;

import com.civicresolver.backend.utils.BaseEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User extends BaseEntity {

    @Id
    private String id;

    @NotBlank
    private String name;

    @Email
    @Indexed(unique = true)
    private String email;

    @NotBlank
    private String password;

    private Role role;
}
