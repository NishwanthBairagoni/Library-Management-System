package com.library.repository;

import com.library.model.MembershipPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembershipPlanRepository extends MongoRepository<MembershipPlan, String> {
    Optional<MembershipPlan> findByName(String name);
}
