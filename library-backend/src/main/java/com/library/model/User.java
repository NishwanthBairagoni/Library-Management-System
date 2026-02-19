package com.library.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String role; // e.g., "USER", "ADMIN", "LIBRARIAN"

    private String status; // e.g., "PENDING", "APPROVED", "REJECTED"

    private String membershipType; // e.g., "Standard", "Premium"

    private java.time.LocalDate membershipExpiry;

    private String name;
    private String phoneNumber;
    private String address;
    private String department; // For Students
    private String employeeId; // For Staff/Librarians

    private String gender;
    private String maritalStatus;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private java.util.List<AcademicDetails> academicDetails;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private java.util.List<WorkExperience> workExperience;}
