package com.library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    private String id;

    private String title;
    
    private String author;
    
    @Indexed(unique = true)
    private String isbn;
    
    private String category;
    
    private String publisher;
    
    private Integer publicationYear;
    
    private String language;
    
    private Double price;
    
    private Integer quantity;
}
