package com.library.repository;

import com.library.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface BookRepository extends MongoRepository<Book, String> {
    Optional<Book> findByIsbn(String isbn);
}
