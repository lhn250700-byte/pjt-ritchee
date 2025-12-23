package com.study.spring.hospital.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
@Data
@AllArgsConstructor
@Builder
public class H_AppmUserHosDto {
	private UUID id;
	private String u_kind;
	private String name;
	private String gender;
	private String phone;
	private String addr;
	private LocalDate birth;
	private String text;
	private int a_id;
	private LocalDateTime a_date;
	private String a_content;
	private String a_dia_name;
	private String a_dia_content;
	private String h_name;
}
