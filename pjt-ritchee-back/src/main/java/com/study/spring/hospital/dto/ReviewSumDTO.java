package com.study.spring.hospital.dto;


public interface ReviewSumDTO {
	//h_review, hospital Master, h_user Master
    Integer getR_id();         
    Integer getA_id();         
    String getH_code();       
    String getH_name();       
    String getH_user_id();    
    String getH_user_name();  
    String getR_title();      
    String getR_content();    
    String getCreatedAt();    
    Integer getR_eval_pt();   
    Integer getR_views();    
	// 통계자료 h_comment, h_like
    Long getComment_cnt();    
    Long getLike_cnt();       
}


	