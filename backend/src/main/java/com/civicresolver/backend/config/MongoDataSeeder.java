package com.civicresolver.backend.config;

import com.civicresolver.backend.complaint.Complaint;
import com.civicresolver.backend.complaint.ComplaintCategory;
import com.civicresolver.backend.complaint.ComplaintRepository;
import com.civicresolver.backend.complaint.ComplaintStatus;
import com.civicresolver.backend.suggestion.Suggestion;
import com.civicresolver.backend.suggestion.SuggestionCategory;
import com.civicresolver.backend.suggestion.SuggestionRepository;
import com.civicresolver.backend.suggestion.SuggestionStatus;
import com.civicresolver.backend.user.Role;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MongoDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ComplaintRepository complaintRepository;
    private final SuggestionRepository suggestionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedComplaints();
        seedSuggestions();
    }

    private void seedUsers() {
        if (userRepository.count() > 0) {
            return;
        }

        String encodedPassword = passwordEncoder.encode("password123");

        List<User> users = List.of(
                User.builder()
                        .id("1")
                        .name("Citizen One")
                        .email("citizen1@example.com")
                        .password(encodedPassword)
                        .role(Role.CITIZEN)
                        .build(),
                User.builder()
                        .id("2")
                        .name("Admin User")
                        .email("admin@example.com")
                        .password(encodedPassword)
                        .role(Role.ADMIN)
                        .build(),
                User.builder()
                        .id("3")
                        .name("Ward Officer")
                        .email("officer1@example.com")
                        .password(encodedPassword)
                        .role(Role.ADMIN)
                        .build(),
                User.builder()
                        .id("4")
                        .name("Municipal Engineer")
                        .email("officer2@example.com")
                        .password(encodedPassword)
                        .role(Role.ADMIN)
                        .build()
        );

        userRepository.saveAll(users);
    }

    private void seedComplaints() {
        if (complaintRepository.count() > 0) {
            return;
        }

        List<Complaint> complaints = List.of(
                Complaint.builder()
                        .id("c1")
                        .title("Pothole on Main St")
                        .category(ComplaintCategory.ROAD)
                        .description("Large pothole causing traffic issues")
                        .status(ComplaintStatus.PENDING)
                        .location("Main Street")
                        .createdById("1")
                        .build(),
                Complaint.builder()
                        .id("c2")
                        .title("Water Leakage")
                        .category(ComplaintCategory.WATER)
                        .description("Leakage near park")
                        .status(ComplaintStatus.ONGOING)
                        .location("City Park")
                        .createdById("1")
                        .assignedOfficerId("3")
                        .build()
        );

        complaintRepository.saveAll(complaints);
    }

    private void seedSuggestions() {
        if (suggestionRepository.count() > 0) {
            return;
        }

        List<Suggestion> suggestions = List.of(
                Suggestion.builder()
                        .id("s1")
                        .title("Plant shade trees near bus stands")
                        .category(SuggestionCategory.PARKS_AND_GREENERY)
                        .description("Tree cover can reduce heat for daily commuters waiting at bus stops.")
                        .area("Ward 3")
                        .latitude(18.5204)
                        .longitude(73.8567)
                        .createdById("1")
                        .status(SuggestionStatus.NEW)
                        .build()
        );

        suggestionRepository.saveAll(suggestions);
    }
}
