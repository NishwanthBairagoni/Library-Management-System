package com.library.controller;

import com.library.model.MembershipPlan;
import com.library.service.MembershipPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memberships")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class MembershipPlanController {

    @Autowired
    private MembershipPlanService service;

    @GetMapping
    public List<MembershipPlan> getAllPlans() {
        return service.getAllPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlan> getPlanById(@PathVariable String id) {
        return ResponseEntity.ok(service.getPlanById(id));
    }

    @PostMapping
    public ResponseEntity<MembershipPlan> createPlan(@RequestBody MembershipPlan plan) {
        return ResponseEntity.ok(service.createPlan(plan));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlan> updatePlan(@PathVariable String id, @RequestBody MembershipPlan plan) {
        return ResponseEntity.ok(service.updatePlan(id, plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable String id) {
        service.deletePlan(id);
        return ResponseEntity.ok().build();
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<MembershipPlan> togglePlanStatus(@PathVariable String id) {
        return ResponseEntity.ok(service.togglePlanStatus(id));
    }
}
