package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class LikeDto {
	private Integer l_id;
	private Integer r_id;
	private UUID h_user_id;
	private LocalDateTime created_at;
}
