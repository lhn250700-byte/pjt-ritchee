package com.study.spring.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.user.dto.UserDto;
import com.study.spring.user.entity.User;
import com.study.spring.user.repository.UserRepository;

@RestController
public class UserController {
	@Autowired
	UserRepository uRepo;
	
	@GetMapping("/api/user")
	public List<UserDto> getUserList() {
		return uRepo.findAllUserByIdDesc();
		
	}
}
