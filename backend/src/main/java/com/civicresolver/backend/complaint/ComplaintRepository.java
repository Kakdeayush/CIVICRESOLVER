package com.civicresolver.backend.complaint;

import com.civicresolver.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByCreatedBy(User user);

    List<Complaint> findByStatus(ComplaintStatus status);
}
