package com.library.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String role; // STUDENT, LIBRARIAN, USER
    private String name;
    private String phoneNumber;
    private String address;
    private String department; // For Student
    private String employeeId; // For Librarian

    private String gender;
    private String maritalStatus;
    
    private java.util.List<AcademicDetailsDTO> academicInfoList;
    private java.util.List<WorkExperienceDTO> workExperienceList;
}
