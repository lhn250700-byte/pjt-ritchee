package com.study.spring.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.spring.hospital.entity.H_like;

public interface LikePostRepository extends JpaRepository<H_like, Integer> {

}
