package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class H_AppmListDto {
	private String h_code;
	private String h_name;
	private List<AppointmentDto> appms;
	private int appmCount;
	private LocalDateTime createdAt;
}
