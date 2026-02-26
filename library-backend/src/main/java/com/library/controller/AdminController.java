package com.library.controller;

import com.library.model.User;
import com.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/users/pending")
    public ResponseEntity<List<User>> getPendingUsers() {
        return ResponseEntity.ok(userService.getPendingUsers());
    }

    @PutMapping("/users/{userId}/approve")
    public ResponseEntity<?> approveUser(@PathVariable String userId) {
        userService.approveUser(userId);
        return ResponseEntity.ok("User approved successfully");
    }

    @PutMapping("/users/{userId}/reject")
    public ResponseEntity<?> rejectUser(@PathVariable String userId) {
        userService.rejectUser(userId);
        return ResponseEntity.ok("User rejected successfully");
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getApprovedUsers() {
        return ResponseEntity.ok(userService.getApprovedUsers());
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/users/{userId}/membership/{planId}")
    public ResponseEntity<?> assignMembership(@PathVariable String userId, @PathVariable String planId) {
        userService.assignMembership(userId, planId);
        return ResponseEntity.ok("Membership assigned successfully");
    }
}
