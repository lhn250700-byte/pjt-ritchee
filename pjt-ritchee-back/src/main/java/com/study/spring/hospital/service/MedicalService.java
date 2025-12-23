package com.study.spring.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.hospital.dto.MedicalListDto;
import com.study.spring.hospital.repository.MedicalReopository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MedicalService {
	@Autowired
    private final MedicalReopository mReop;

    public List<MedicalListDto> getMedicalList() {

        // 나중에 추가할 수 있는 로직 (예: 필터링)
        // List<MedicalListDto> list = mReop.findAllMedicalByIdDesc();
        // list.removeIf(item -> item.getStatus().equals("삭제"));
        // return list;

        return mReop.findAllMedicalByIdDesc();
    }
}