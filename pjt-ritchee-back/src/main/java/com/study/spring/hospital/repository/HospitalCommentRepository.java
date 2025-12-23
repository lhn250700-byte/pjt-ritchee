package com.study.spring.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.entity.H_comment;

@Repository
public interface HospitalCommentRepository extends JpaRepository<H_comment, Integer>{

}
