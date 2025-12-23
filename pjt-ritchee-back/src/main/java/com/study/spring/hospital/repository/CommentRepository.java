package com.study.spring.hospital.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.study.spring.hospital.entity.H_comment;

public interface CommentRepository extends JpaRepository<H_comment, Integer> {
	
}