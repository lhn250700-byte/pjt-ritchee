package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class H_ReviewListDto {
	private String h_code;
	private String h_name;
	private List<ReviewDto> reviews;
	private Integer reviewCount;
	private LocalDateTime createdAt;
}
