package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class H_ReviewLikeDto {
	private int r_id;
	private List<LikeDto> likes;
	private Integer likeCount;
	private LocalDateTime createdAt;
}
