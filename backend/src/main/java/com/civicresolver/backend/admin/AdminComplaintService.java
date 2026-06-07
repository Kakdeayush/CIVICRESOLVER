package com.civicresolver.backend.admin;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.WeekFields;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.civicresolver.backend.admin.dto.AreaComplaintCountDTO;
import com.civicresolver.backend.admin.dto.AssignRequestDTO;
import com.civicresolver.backend.admin.dto.DashboardResponseDTO;
import com.civicresolver.backend.admin.dto.DayWiseReportDTO;
import com.civicresolver.backend.admin.dto.MonthWiseReportDTO;
import com.civicresolver.backend.admin.dto.UpdateStatusDTO;
import com.civicresolver.backend.admin.dto.UserComplaintCountDTO;
import com.civicresolver.backend.admin.dto.WeekWiseReportDTO;
import com.civicresolver.backend.complaint.Complaint;
import com.civicresolver.backend.complaint.ComplaintRepository;
import com.civicresolver.backend.complaint.ComplaintStatus;
import com.civicresolver.backend.complaint.dto.ComplaintResponseDTO;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    // Get all complaints
    public List<ComplaintResponseDTO> getAllComplaints() {
        return complaintRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // Update complaint status
    public ComplaintResponseDTO updateStatus(String complaintId, UpdateStatusDTO dto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(dto.getStatus());
        Complaint saved = complaintRepository.save(complaint);
        return mapToDTO(saved);
    }

    // Assign officer
    public ComplaintResponseDTO assignOfficer(String complaintId, AssignRequestDTO dto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        User officer = userRepository.findById(dto.getOfficerId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        complaint.setAssignedOfficerId(officer.getId());
        Complaint saved = complaintRepository.save(complaint);
        return mapToDTO(saved);
    }

    // Dashboard analytics (mockable)
    public DashboardResponseDTO getDashboard() {
        List<Complaint> complaints = complaintRepository.findAll();

        Map<ComplaintStatus, Long> statusCounts = complaints.stream()
                .collect(Collectors.groupingBy(Complaint::getStatus, Collectors.counting()));

        Map<String, Long> monthlyCounts = new HashMap<>();
        for (Complaint c : complaints) {
            String month = c.getCreatedAt().getMonth().name();
            monthlyCounts.put(month, monthlyCounts.getOrDefault(month, 0L) + 1);
        }

        return DashboardResponseDTO.builder()
                .totalComplaints((long) complaints.size())
                .pending(statusCounts.getOrDefault(ComplaintStatus.PENDING, 0L))
                .ongoing(statusCounts.getOrDefault(ComplaintStatus.ONGOING, 0L))
                .resolved(statusCounts.getOrDefault(ComplaintStatus.RESOLVED, 0L))
                .monthlyCounts(monthlyCounts)
                .build();
    }

    // Day-wise report
    public DayWiseReportDTO getDayWiseReport(LocalDate date) {
        List<Complaint> complaints = complaintRepository.findAll();
        
        // Filter complaints for the given date
        List<Complaint> dayComplaints = complaints.stream()
                .filter(c -> c.getCreatedAt() != null && c.getCreatedAt().toLocalDate().equals(date))
                .toList();
        
        return DayWiseReportDTO.builder()
                .date(date)
                .totalComplaints((long) dayComplaints.size())
                .topUsers(getTopUsersByComplaints(dayComplaints, 10))
                .topAreas(getTopAreasByComplaints(dayComplaints, 10))
                .build();
    }

    // Week-wise report
    public WeekWiseReportDTO getWeekWiseReport(LocalDate date) {
        List<Complaint> complaints = complaintRepository.findAll();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int weekOfYear = date.get(weekFields.weekOfYear());
        int year = date.getYear();
        
        LocalDate weekStart = LocalDate.of(year, 1, 1)
                .with(weekFields.weekOfYear(), weekOfYear)
                .with(weekFields.dayOfWeek(), 1);
        LocalDate weekEnd = weekStart.plusDays(6);
        
        List<Complaint> weekComplaints = complaints.stream()
                .filter(c -> {
                    if (c.getCreatedAt() == null) {
                        return false;
                    }
                    LocalDate complaintDate = c.getCreatedAt().toLocalDate();
                    return !complaintDate.isBefore(weekStart) && !complaintDate.isAfter(weekEnd);
                })
                .toList();
        
        return WeekWiseReportDTO.builder()
                .weekStart(weekStart)
                .weekEnd(weekEnd)
                .totalComplaints((long) weekComplaints.size())
                .topUsers(getTopUsersByComplaints(weekComplaints, 10))
                .topAreas(getTopAreasByComplaints(weekComplaints, 10))
                .build();
    }

    // Month-wise report
    public MonthWiseReportDTO getMonthWiseReport(Integer year, Integer month) {
        List<Complaint> complaints = complaintRepository.findAll();
        YearMonth yearMonth = YearMonth.of(year, month);
        
        List<Complaint> monthComplaints = complaints.stream()
                .filter(c -> {
                    if (c.getCreatedAt() == null) {
                        return false;
                    }
                    YearMonth complaintYearMonth = YearMonth.from(c.getCreatedAt());
                    return complaintYearMonth.equals(yearMonth);
                })
                .toList();
        
        String monthName = yearMonth.getMonth().name();
        
        return MonthWiseReportDTO.builder()
                .year(year)
                .month(month)
                .monthName(monthName)
                .totalComplaints((long) monthComplaints.size())
                .topUsers(getTopUsersByComplaints(monthComplaints, 10))
                .topAreas(getTopAreasByComplaints(monthComplaints, 10))
                .build();
    }

    // Helper: Get top users by complaint count
    private List<UserComplaintCountDTO> getTopUsersByComplaints(List<Complaint> complaints, int limit) {
        return complaints.stream()
                .collect(Collectors.groupingBy(Complaint::getCreatedById, Collectors.counting()))
                .entrySet().stream()
                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                .limit(limit)
                .map(entry -> {
                    String userName = userRepository.findById(entry.getKey())
                            .map(User::getName)
                            .orElse("Unknown User");
                    return UserComplaintCountDTO.builder()
                            .userId(entry.getKey())
                            .userName(userName)
                            .complaintCount(entry.getValue())
                            .build();
                })
                .collect(Collectors.toList());
    }

    // Helper: Get top areas by complaint count
    private List<AreaComplaintCountDTO> getTopAreasByComplaints(List<Complaint> complaints, int limit) {
        return complaints.stream()
                .filter(c -> c.getLocation() != null && !c.getLocation().isEmpty())
                .collect(Collectors.groupingBy(Complaint::getLocation, Collectors.counting()))
                .entrySet().stream()
                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                .limit(limit)
                .map(entry -> AreaComplaintCountDTO.builder()
                        .area(entry.getKey())
                        .complaintCount(entry.getValue())
                        .build())
                .collect(Collectors.toList());
    }

    private ComplaintResponseDTO mapToDTO(Complaint c) {
        String createdByName = userRepository.findById(c.getCreatedById())
                .map(User::getName)
                .orElse("Unknown User");

        String assignedOfficerName = c.getAssignedOfficerId() == null
                ? null
                : userRepository.findById(c.getAssignedOfficerId())
                .map(User::getName)
                .orElse("Unknown Officer");

        return ComplaintResponseDTO.builder()
                .id(c.getId())
                .title(c.getTitle())
                .category(c.getCategory().name()) // <- convert enum to String
                .description(c.getDescription())
                .status(c.getStatus())
                .location(c.getLocation())
                .imageUrl(c.getImageUrl())
                .createdByName(createdByName)
                .assignedOfficerId(c.getAssignedOfficerId())
                .assignedOfficerName(assignedOfficerName)
                .createdAt(c.getCreatedAt())
                .updatedAt(c.getUpdatedAt())
                .build();
    }


}