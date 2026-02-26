package com.library.service;

import com.library.model.MembershipPlan;
import com.library.repository.MembershipPlanRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipPlanService {

    @Autowired
    private MembershipPlanRepository repository;

    @PostConstruct
    public void initDefaultPlans() {
        if (repository.count() == 0) {
            List<MembershipPlan> defaultPlans = Arrays.asList(
                new MembershipPlan(null, "Basic", 500.0, 2, 14, 10.0, 
                        Arrays.asList("Access to standard collection", "Standard reading room access"), true),
                new MembershipPlan(null, "Standard", 1000.0, 5, 21, 5.0, 
                        Arrays.asList("Access to standard & premium collections", "Digital library access", "Priority support"), true),
                new MembershipPlan(null, "Premium", 2000.0, 10, 30, 0.0, 
                        Arrays.asList("Access to all collections including rare books", "Free home delivery", "No late fees", "Dedicated study cabin"), true)
            );
            repository.saveAll(defaultPlans);
        }
    }

    public List<MembershipPlan> getAllPlans() {
        return repository.findAll();
    }

    public MembershipPlan getPlanById(String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Membership plan not found"));
    }

    public MembershipPlan createPlan(MembershipPlan plan) {
        return repository.save(plan);
    }

    public MembershipPlan updatePlan(String id, MembershipPlan planDetails) {
        MembershipPlan plan = getPlanById(id);
        plan.setName(planDetails.getName());
        plan.setPrice(planDetails.getPrice());
        plan.setMaxBooksAllowed(planDetails.getMaxBooksAllowed());
        plan.setLoanPeriodDays(planDetails.getLoanPeriodDays());
        plan.setLateFeePerDay(planDetails.getLateFeePerDay());
        plan.setBenefits(planDetails.getBenefits());
        plan.setActive(planDetails.isActive());
        return repository.save(plan);
    }

    public void deletePlan(String id) {
        repository.deleteById(id);
    }
    
    public MembershipPlan togglePlanStatus(String id) {
        MembershipPlan plan = getPlanById(id);
        plan.setActive(!plan.isActive());
        return repository.save(plan);
    }
}
