package com.library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Document(collection = "issues")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    @Id
    private String id;

    @DBRef
    private User user;

    @DBRef
    private Book book;

    private LocalDate issueDate;
    private LocalDate returnDate;
    private LocalDate actualReturnDate;

    private String status; // "ISSUED", "RETURNED"

    private Double fine;
}
