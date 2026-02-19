package com.library.controller;

import com.library.model.Issue;
import com.library.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/issue")
    public ResponseEntity<?> issueBook(@RequestParam Long userId, @RequestParam Long bookId) {
        try {
            Issue issue = issueService.issueBook(userId, bookId);
            return ResponseEntity.ok(issue);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/return")
    public ResponseEntity<?> returnBook(@RequestParam Long userId, @RequestParam Long bookId) {
        try {
            Issue issue = issueService.returnBook(userId, bookId);
            return ResponseEntity.ok(issue);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<Issue>> getActiveIssues() {
        return ResponseEntity.ok(issueService.getActiveIssues());
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<Issue>> getUserHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(issueService.getUserHistory(userId));
    }
}
