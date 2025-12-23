package com.study.spring.hospital.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MedicalListDto {

    private int a_id;
    private String a_content;
    private LocalDateTime a_date;
    private String a_del_yn;
    private String a_dia_content;
    private String a_dia_name;
    private String a_user_id;
    private LocalDateTime createdAt;
    private String h_code;

    // JPA @Query가 호출하는 생성자
    public MedicalListDto(
            int a_id,
            String a_content,
            LocalDateTime a_date,
            String a_del_yn,
            String a_dia_content,
            String a_dia_name,
            String a_user_id,
            LocalDateTime createdAt,
            String h_code
    ) {
        this.a_id = a_id;
        this.a_content = a_content;
        this.a_date = a_date;
        this.a_del_yn = a_del_yn;
        this.a_dia_content = a_dia_content;
        this.a_dia_name = a_dia_name;
        this.a_user_id = a_user_id;
        this.createdAt = createdAt;
        this.h_code = h_code;
    }
}
