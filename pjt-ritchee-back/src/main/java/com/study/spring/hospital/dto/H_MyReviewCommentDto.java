package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class H_MyReviewCommentDto {
	private int r_id;
	private String r_title;
	private String r_content;
	private Integer r_eval_pt;
	private Integer r_views;
	private List<MyCommentDto> comments;
	private Integer commentCount;
	private LocalDateTime createdAt;
}




