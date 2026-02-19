package com.library.repository;

import com.library.model.Issue;
import com.library.model.User;
import com.library.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByUser(User user);
    List<Issue> findByStatus(String status);
    Optional<Issue> findByBookAndStatus(Book book, String status);
    List<Issue> findByUserAndStatus(User user, String status);
}
