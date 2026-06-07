package com.civicresolver.backend.suggestion;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SuggestionRepository extends MongoRepository<Suggestion, String> {
    List<Suggestion> findByCreatedByIdOrderByCreatedAtDesc(String createdById);

    List<Suggestion> findAllByOrderByCreatedAtDesc();
}
