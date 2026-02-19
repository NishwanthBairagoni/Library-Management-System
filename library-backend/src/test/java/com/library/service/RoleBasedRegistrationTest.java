package com.library.service;

import com.library.dto.RegisterRequest;
import com.library.model.User;
import com.library.model.Student;
import com.library.model.Librarian;
import com.library.repository.UserRepository;
import com.library.repository.StudentRepository;
import com.library.repository.LibrarianRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class RoleBasedRegistrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LibrarianRepository librarianRepository;

    @Test
    public void testStudentRegistrationAndApproval() {
        // 1. Register Student
        RegisterRequest request = new RegisterRequest();
        request.setEmail("student_role_test@test.com");
        request.setPassword("password");
        request.setRole("STUDENT");
        request.setName("Test Student Role");
        request.setPhoneNumber("9998887776");
        request.setAddress("Student Address");
        request.setDepartment("Physics");

        User registeredUser = userService.registerUser(request);

        // 2. Verify User Table
        assertNotNull(registeredUser.getId());
        assertEquals("PENDING", registeredUser.getStatus());
        assertEquals("STUDENT", registeredUser.getRole());

        // 3. Verify Student Table
        Optional<Student> studentOpt = studentRepository.findAll().stream()
                .filter(s -> s.getUser().getId().equals(registeredUser.getId()))
                .findFirst();
        assertTrue(studentOpt.isPresent());
        assertEquals("Physics", studentOpt.get().getDepartment());
        assertEquals("Test Student Role", studentOpt.get().getName());

        // 4. Try Login (Should Fail)
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser(request.getEmail(), request.getPassword(), "STUDENT");
        });
        assertTrue(exception.getMessage().contains("PENDING"));

        // 5. Approve User
        userService.approveUser(registeredUser.getId());

        // 6. Verify Status
        User approvedUser = userRepository.findById(registeredUser.getId()).get();
        assertEquals("APPROVED", approvedUser.getStatus());

        // 7. Try Login (Should Success)
        Optional<User> loggedInUser = userService.loginUser(request.getEmail(), request.getPassword(), "STUDENT");
        assertTrue(loggedInUser.isPresent());
    }

    @Test
    public void testLibrarianRegistration() {
        // 1. Register Librarian
        RegisterRequest request = new RegisterRequest();
        request.setEmail("librarian_role_test@test.com");
        request.setPassword("password");
        request.setRole("LIBRARIAN");
        request.setName("Test Lib Role");
        request.setEmployeeId("LIB-001");

        User registeredUser = userService.registerUser(request);

        // 2. Verify Librarian Table
        Optional<Librarian> libOpt = librarianRepository.findAll().stream()
                .filter(l -> l.getUser().getId().equals(registeredUser.getId()))
                .findFirst();
        assertTrue(libOpt.isPresent());
        assertEquals("LIB-001", libOpt.get().getEmployeeId());
    }
}
