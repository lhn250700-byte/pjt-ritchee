package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HospitalDto {
	private String h_code;
    private String h_name;
    private String h_addr;
    private String h_kind;

    private String h_bigo;
    private String h_content;

    private String h_tel1;
    private String h_tel2;

    private String h_long;
    private String h_lat;
    
    private String h_smpl_dgm;

    private String h_park_yn;

    private OperatingHours operatingHours;
    private TimeRange lunchTime;

    private LocalDateTime createdAt;
	
	
	@Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeRange {
        private String start;
        private String end;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OperatingHours {
        private TimeRange mon;
        private TimeRange tue;
        private TimeRange wed;
        private TimeRange thu;
        private TimeRange fri;
        private TimeRange sat;
        private TimeRange sun;
        private TimeRange holiday;
    }
}
