package com.library.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "membership_plans")
public class MembershipPlan {
    @Id
    private String id;
    
    private String name;
    private double price;
    private int maxBooksAllowed;
    private int loanPeriodDays;
    private double lateFeePerDay;
    private List<String> benefits;
    private boolean active;
}
