package com.study.spring.hospital.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDto {
	private int a_id;
	private LocalDateTime a_date;
	private String a_content;
	private String a_dia_name;
	private String a_dia_content;
}