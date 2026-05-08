package com.study.spring.hospital.service;

import com.study.spring.hospital.entity.H_appm;
import com.study.spring.hospital.repository.AppointmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    @Transactional
    public void updateOpinion(int a_id, String diaName, String diaContent) {

        H_appm appointment = appointmentRepository.findById(a_id)
                .orElseThrow(() -> new EntityNotFoundException("예약 ID " + a_id + " 없음"));

        appointment.setA_dia_name(diaName);
        appointment.setA_dia_content(diaContent);

        try {
            appointmentRepository.save(appointment);
        } catch (ObjectOptimisticLockingFailureException e) {
            // 낙관적 락 충돌
            throw new RuntimeException("다른 사용자가 이미 수정했습니다.");
        }
    }
}
