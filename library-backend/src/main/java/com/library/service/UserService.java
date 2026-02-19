package com.library.service;

import com.library.model.User;
import com.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Autowired
    private com.library.repository.StudentRepository studentRepository;

    @Autowired
    private com.library.repository.LibrarianRepository librarianRepository;

    public User registerUser(com.library.dto.RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with this email");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setStatus("PENDING"); // Default status

        // New fields
        user.setName(request.getName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setGender(request.getGender());
        user.setMaritalStatus(request.getMaritalStatus());

        if ("STUDENT".equalsIgnoreCase(request.getRole())) {
            user.setDepartment(request.getDepartment());
        } else if ("LIBRARIAN".equalsIgnoreCase(request.getRole())) {
            user.setEmployeeId(request.getEmployeeId());
        }

        // Save academic details
        if (request.getAcademicInfoList() != null) {
            java.util.List<com.library.model.AcademicDetails> academicDetails = request.getAcademicInfoList().stream().map(dto -> {
                com.library.model.AcademicDetails details = new com.library.model.AcademicDetails();
                details.setUser(user);
                details.setLevel(dto.getLevel());
                details.setInstitution(dto.getInstitution());
                details.setPassingYear(dto.getPassingYear());
                details.setScore(dto.getScore());
                return details;
            }).collect(java.util.stream.Collectors.toList());
            user.setAcademicDetails(academicDetails);
        }

        // Save work experience
        if (request.getWorkExperienceList() != null) {
            java.util.List<com.library.model.WorkExperience> workExperience = request.getWorkExperienceList().stream().map(dto -> {
                com.library.model.WorkExperience exp = new com.library.model.WorkExperience();
                exp.setUser(user);
                exp.setCompany(dto.getCompany());
                exp.setRole(dto.getRole());
                exp.setDuration(dto.getDuration());
                return exp;
            }).collect(java.util.stream.Collectors.toList());
            user.setWorkExperience(workExperience);
        }

        User savedUser = userRepository.save(user);

        if ("STUDENT".equalsIgnoreCase(request.getRole())) {
            com.library.model.Student student = new com.library.model.Student();
            student.setUser(savedUser);
            student.setName(request.getName());
            student.setPhoneNumber(request.getPhoneNumber());
            student.setAddress(request.getAddress());
            student.setDepartment(request.getDepartment());
            studentRepository.save(student);
        } else if ("LIBRARIAN".equalsIgnoreCase(request.getRole())) {
            com.library.model.Librarian librarian = new com.library.model.Librarian();
            librarian.setUser(savedUser);
            librarian.setName(request.getName());
            librarian.setPhoneNumber(request.getPhoneNumber());
            librarian.setAddress(request.getAddress());
            librarian.setEmployeeId(request.getEmployeeId());
            librarianRepository.save(librarian);
        }

        return savedUser;
    }

    public Optional<User> loginUser(String email, String password, String role) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            if (user.get().getRole().equalsIgnoreCase(role)) {
                if ("APPROVED".equalsIgnoreCase(user.get().getStatus())) {
                    return user;
                } else {
                    throw new RuntimeException("Account is " + user.get().getStatus());
                }
            }
        }
        return Optional.empty();
    }

    public java.util.List<User> getPendingUsers() {
        return userRepository.findAll().stream()
                .filter(user -> "PENDING".equalsIgnoreCase(user.getStatus()))
                .collect(java.util.stream.Collectors.toList());
    }

    public void approveUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("APPROVED");
        userRepository.save(user);
    }

    public void rejectUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("REJECTED");
        userRepository.save(user);
    }
    public java.util.List<User> getApprovedUsers() {
        return userRepository.findAll().stream()
                .filter(user -> "APPROVED".equalsIgnoreCase(user.getStatus()))
                .collect(java.util.stream.Collectors.toList());
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
