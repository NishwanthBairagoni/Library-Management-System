package com.library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "librarians")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Librarian {

    @Id
    private String id;

    @DBRef
    private User user;

    private String name;
    private String phoneNumber;
    private String address;
    private String employeeId;
}
