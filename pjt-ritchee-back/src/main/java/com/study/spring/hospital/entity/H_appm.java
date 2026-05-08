package com.study.spring.hospital.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.study.spring.user.entity.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="h_appm")
@Data
@NoArgsConstructor @AllArgsConstructor
@Builder
public class H_appm {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // autoincrement 설정
	private int a_id;

	@Version
	@Column(nullable = false)
	private Long version = 0L;
	
	@OneToOne(mappedBy = "h_appm")
	private H_review h_review;

	@ManyToOne
	@JoinColumn(name="h_code")
	private Hospital hospital;
	
	@ManyToOne
	@JoinColumn(name="a_user_id")
	private User h_user;
	
	private LocalDateTime a_date;
	private String a_content;
	private String a_del_yn;
	private String a_dia_name;
	private String a_dia_content;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	@PrePersist	
	public void onCreate() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}
	
	@PreUpdate
	public void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
}
