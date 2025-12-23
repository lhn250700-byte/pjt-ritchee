package com.study.spring.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.MedicalListDto;
import com.study.spring.hospital.service.MedicalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MedicalController {

	@Autowired
    private final MedicalService medicalService;

    @GetMapping("/api/appmlist")
    public List<MedicalListDto> getMedicalList() {
        return medicalService.getMedicalList();
    }
}