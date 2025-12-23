package com.study.spring.hospital.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.study.spring.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
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
