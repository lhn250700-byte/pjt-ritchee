package com.study.spring.hospital.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AppointmentWithHospitalNameDto {
	private int a_id;
	private LocalDateTime a_date;
	private String a_content;
	private String a_dia_name;
	private String a_dia_content;
	private String h_name;
}
