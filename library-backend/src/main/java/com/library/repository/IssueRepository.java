package com.library.repository;

import com.library.model.Issue;
import com.library.model.User;
import com.library.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface IssueRepository extends MongoRepository<Issue, String> {
    List<Issue> findByUser(User user);
    List<Issue> findByStatus(String status);
    Optional<Issue> findByBookAndStatus(Book book, String status);
    List<Issue> findByUserAndStatus(User user, String status);
}
