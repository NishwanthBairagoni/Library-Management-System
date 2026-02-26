package com.library.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcademicDetails {

    private String level; // e.g., "High School", "Bachelor's"
    private String institution;
    private String passingYear;
    private String score;
}
