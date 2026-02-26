package com.library.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperience {

    private String company;
    private String role;
    private String duration; // e.g., "2 years", "2020-2022"
}
