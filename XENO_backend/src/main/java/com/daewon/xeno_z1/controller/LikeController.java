 package com.daewon.xeno_z1.controller;

 import com.daewon.xeno_z1.repository.ProductsLikeRepository;
 import com.daewon.xeno_z1.service.LikeService;
 import io.swagger.v3.oas.annotations.Operation;
 import lombok.RequiredArgsConstructor;
 import lombok.extern.log4j.Log4j2;

 import org.springframework.security.access.prepost.PreAuthorize;
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RequestParam;
 import org.springframework.web.bind.annotation.RestController;

 import java.util.List;

 @RestController
 @Log4j2
 @RequestMapping("/api/like")
 @RequiredArgsConstructor
 public class LikeController {

     private final LikeService likeService;
     private final ProductsLikeRepository productsLikeRepository;



     @Operation(summary = "즐겨찾기")
     @PreAuthorize("hasRole('USER')")
     @GetMapping()
     public boolean like(@RequestParam Long productColorId) {
         enjoyService.enjoyPharmacy(productColorId); // phId를 통한 약국 즐겨찾기
         PharmacyEnjoy pharmacyEnjoy = pharmacyEnjoyRepository.findByPhId(phId) // 약국 아이디를 통해 즐겨찾기 된 약국 찾기
                 .orElse(null);
         return pharmacyEnjoy != null;  // 객체가 있으면 true, 없으면 false 반환
     }



     @Operation(summary = "자신이 즐겨찾기한 약국 목록")
     @GetMapping("/list") // 자신이 즐겨찾기한 약국 목록 (즐겨찾기한 순 정렬)
     public List<PharmacyEnjoyRankListDTO> enjoyedPharmaciesList(){ //
         List<PharmacyEnjoyRankListDTO> Pharmacylist = enjoyService.enjoyedPharmaciesListByUser();
         return Pharmacylist;
     }

 }
