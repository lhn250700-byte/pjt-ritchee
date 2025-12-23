package com.study.spring.hospital.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.UserInfoCheckDTO;
import com.study.spring.hospital.repository.UserInfoRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UserInfoCheckController {

    @Autowired
    private UserInfoRepository uinforepo;
    
    @GetMapping("/api/useremailchk")
    public Optional<UserInfoCheckDTO> userInfoCheckYn(
            @RequestParam(name = "email") String email){
        // ...
        Optional<UserInfoCheckDTO> userInfoCheckYn = uinforepo.userInfoCheckYn(email);
        return userInfoCheckYn;
    }
}