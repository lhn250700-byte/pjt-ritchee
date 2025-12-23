package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyCommentDto {
	private int reviewId; // 댓글이 달릴 리뷰 ID 추가
	private String c_content;
	private UUID userId;
	private String name;
	private LocalDateTime createdAt;

	public MyCommentDto(
						int reviewId,
						UUID userId,
						String c_content,
						String name,
						LocalDateTime createdAt) {
		this.reviewId = reviewId;
		this.userId = userId;
		this.c_content = c_content;
		this.name = name;
		this.createdAt = createdAt;
	}
}
