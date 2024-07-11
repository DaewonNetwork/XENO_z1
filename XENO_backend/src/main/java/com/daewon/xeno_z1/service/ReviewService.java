package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.page.PageInfinityResponseDTO;
import com.daewon.xeno_z1.dto.page.PageRequestDTO;
import com.daewon.xeno_z1.dto.page.PageResponseDTO;
import com.daewon.xeno_z1.dto.review.ReviewCardDTO;

import java.util.List;

import java.util.Map;

import com.daewon.xeno_z1.dto.review.ReviewCreateDTO;
import com.daewon.xeno_z1.dto.review.ReviewInfoDTO;
import com.daewon.xeno_z1.dto.review.ReviewUpdateDTO;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewService {

    String createReview(ReviewCreateDTO reviewCreateDTO, MultipartFile image, UserDetails userDetails);

    ReviewInfoDTO readReviewInfo(Long reviewId);

    String updateReview(Long reviewId, ReviewUpdateDTO reviewDTO, MultipartFile image);

    void deleteReview(Long reviewId);


    PageInfinityResponseDTO<ReviewCardDTO> readAllReviewImageList(PageRequestDTO pageRequestDTO);

    PageResponseDTO<ReviewInfoDTO> readReviewList(Long productColorId,PageRequestDTO pageRequestDTO);


}