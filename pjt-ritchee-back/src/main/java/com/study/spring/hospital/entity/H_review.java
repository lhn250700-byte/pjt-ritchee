package com.study.spring.hospital.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.study.spring.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="h_review", uniqueConstraints = {
		@UniqueConstraint(
				name="h_review_a_id",
				columnNames = {"a_id"}
		)})
@Data
@NoArgsConstructor @AllArgsConstructor
@Builder
public class H_review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment 설정
	private int r_id;
	
	@OneToOne
	@JoinColumn(name="a_id")
	private H_appm h_appm;
	
	
	@ManyToOne
	@JoinColumn(name="h_code")
	private Hospital hospital;
	
	@OneToMany(mappedBy = "h_review")
	private List<H_comment> comments = new ArrayList<>();
	
	@OneToMany(mappedBy = "h_review")
	private List<H_like> likes = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name="h_user_id")
	private User h_user;
	
	
	private String r_title;
	private String r_content;
	private Integer r_eval_pt;
	private Integer r_views;
	private String r_del_yn;
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
