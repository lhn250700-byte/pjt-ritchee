package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class H_ReviewCommentDto {
	private int r_id;
	private String r_title;
	private String r_content;
	private Integer r_eval_pt;
	private Integer r_views;
	private List<CommentDto> comments;
	private Integer commentCount;
	private LocalDateTime createdAt;
}




