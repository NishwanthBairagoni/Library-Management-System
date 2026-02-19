package com.library.service;

import com.library.model.User;
import com.library.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class LoginRoleTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    public LoginRoleTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testStudentLoginWithCorrectRole() {
        // Arrange
        String email = "student@test.com";
        String password = "password";
        String role = "USER";
        
        User studentUser = new User();
        studentUser.setEmail(email);
        studentUser.setPassword("encodedPassword");
        studentUser.setRole("USER"); 
        studentUser.setStatus("APPROVED"); 

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(studentUser));
        when(passwordEncoder.matches(password, studentUser.getPassword())).thenReturn(true);

        // Act
        Optional<User> loggedInUser = userService.loginUser(email, password, role);
        
        // Assert
        assertTrue(loggedInUser.isPresent());
    }

    @Test
    public void testStudentCannotLoginAsAdmin() {
        // Arrange
        String email = "student@test.com";
        String password = "password";
        String role = "ADMIN"; // Trying to login as ADMIN
        
        User studentUser = new User();
        studentUser.setEmail(email);
        studentUser.setPassword("encodedPassword");
        studentUser.setRole("USER"); // Actual role is USER
        studentUser.setStatus("APPROVED");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(studentUser));
        when(passwordEncoder.matches(password, studentUser.getPassword())).thenReturn(true);

        // Act
        Optional<User> loggedInUser = userService.loginUser(email, password, role);
        
        // Assert
        assertFalse(loggedInUser.isPresent(), "User should not be able to login with incorrect role");
    }
}
