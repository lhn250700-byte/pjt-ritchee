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
public class H_CommentUserDto {
	private UUID id;
	private String u_kind;
	private String email;
	private String name;
	private String pswd;
	private String gender;
	private String phone;
	private String addr;
	private LocalDate birth;
	private String text;
	private List<CommentDto> comments;
	private LocalDateTime createdAt;
}
