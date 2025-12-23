package com.study.spring.hospital.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.study.spring.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="h_comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class H_comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int c_id;
	
	
	@ManyToOne
	@JoinColumn(name="r_id")
	private H_review h_review;
	
	@ManyToOne
	@JoinColumn(name="h_user_id")
	private User h_user;
	
	private String c_content;
	private String c_del_yn;
	private LocalDateTime createdAt;
	
	@PrePersist
	public void onCreate() {
		this.createdAt = LocalDateTime.now();
	}
}
