package com.civicresolver.backend.complaint;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {

    List<Complaint> findByCreatedByIdOrderByCreatedAtDesc(String createdById);

    List<Complaint> findByStatus(ComplaintStatus status);

    List<Complaint> findAllByOrderByCreatedAtDesc();
}
