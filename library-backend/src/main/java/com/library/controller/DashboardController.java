package com.library.controller;

import com.library.repository.BookRepository;
import com.library.repository.IssueRepository;
import com.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssueRepository issueRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalUsers = userRepository.count();
        long totalBooks = bookRepository.count();
        long activeIssues = issueRepository.findByStatus("ISSUED").size();
        
        // Calculate overdue books (simple logic: active issues where return date < now)
        long overdueBooks = issueRepository.findByStatus("ISSUED").stream()
                .filter(issue -> issue.getReturnDate().isBefore(java.time.LocalDate.now()))
                .count();

        stats.put("totalUsers", totalUsers);
        stats.put("totalBooks", totalBooks);
        stats.put("activeIssues", activeIssues);
        stats.put("overdueBooks", overdueBooks);

        return ResponseEntity.ok(stats);
    }
}
