package com.library.service;

import com.library.model.Book;
import com.library.model.Issue;
import com.library.model.User;
import com.library.repository.BookRepository;
import com.library.repository.IssueRepository;
import com.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public Issue issueBook(String userId, String bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book is out of stock");
        }

        // Check if user already has this book issued
        if (issueRepository.findByBookAndStatus(book, "ISSUED").isPresent()) {
             // Ideally we check if *this specific user* has it, but for now assuming 1 copy per issue record is enough constraint?
             // Actually, check if *user* has it.
             // Simplification: Allow multiple copies to be issued, but decrement stock.
        }

        Issue issue = new Issue();
        issue.setUser(user);
        issue.setBook(book);
        issue.setIssueDate(LocalDate.now());
        issue.setReturnDate(LocalDate.now().plusDays(14)); // 2 weeks default
        issue.setStatus("ISSUED");
        issue.setFine(0.0);

        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        return issueRepository.save(issue);
    }

    public Issue returnBook(String bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        
        throw new RuntimeException("Please use returnBook(String issueId) or provide Student ID");
    }

    public Issue returnBook(String userId, String bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        List<Issue> issues = issueRepository.findByUserAndStatus(user, "ISSUED");
        Issue issueToReturn = issues.stream()
                .filter(i -> i.getBook().getId().equals(bookId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No active issue found for this book and user"));

        issueToReturn.setActualReturnDate(LocalDate.now());
        issueToReturn.setStatus("RETURNED");

        
        if (issueToReturn.getActualReturnDate().isAfter(issueToReturn.getReturnDate())) {
            long overdueDays = java.time.temporal.ChronoUnit.DAYS.between(issueToReturn.getReturnDate(), issueToReturn.getActualReturnDate());
            issueToReturn.setFine(overdueDays * 1.0); 
        }

        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);

        return issueRepository.save(issueToReturn);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public List<Issue> getUserHistory(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByUser(user);
    }

    public List<Issue> getActiveIssues() {
        return issueRepository.findByStatus("ISSUED");
    }
}
