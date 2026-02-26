package com.library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
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

    private java.util.List<AcademicDetails> academicDetails;

    private java.util.List<WorkExperience> workExperience;
}
