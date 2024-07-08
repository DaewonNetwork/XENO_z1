package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.domain.ProductsLike;
import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@Log4j2
@RequiredArgsConstructor
public class LikeServiceImpl  implements LikeService {


    private final ProductsRepository productsRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final ProductsLikeRepository productsLikeRepository;
    private final ProductsColorRepository productsColorRepository;


    @Override
    public void likeProduct(Long productColorId) { // 즐겨찾기 기능

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String currentUserName = authentication.getName();
        log.info("이름:"+currentUserName);
        Users users = userRepository.findByEmail(currentUserName)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        Long userId = users.getUserId();

        ProductsColor productsColor = productsColorRepository.findById(productColorId)
                .orElse(null);

        ProductsLike productLike = productsLikeRepository.findByProductColorId(productColorId)
                .orElseGet(() -> { // phId를 가지고 즐겨찾기된 약국 찾기, 해당하는 phId가 없을경우 새로 생성
                    ProductsLike newProductsLike = ProductsLike.builder()
                            .productsColor(productsColor)
                            .build();
                    return productsLikeRepository.save(newProductsLike);
                });

        if (likeRepository.findByProductsAndUsers(phId, userId) == null) { // 즐겨찾기 안 했을 때 즐겨찾기 기능
            productLike.setLikeIndex(productLike.getLikeIndex() + 1); // LikeIndex()가 + 1 추가됨
            productLikeRepository.save(productLike);
            LikePh likePh = new LikePh(productLike, users);
            likeRepository.save(likePh);
            log.info(product);
            log.info(likePh);
            log.info("즐겨찾기");
        } else { // 즐겨찾기를 이미 했을 때 즐겨찾기 취소
            LikePh likePh = likeRepository.findByProductsAndUsers(phId, userId); // LikePh 객체 생성
            likeRepository.delete(likePh); // 레코드 삭제
            productLike.setLikeIndex(productLike.getLikeIndex() - 1); // 즐겨찾기 수 -1
            if(productLike.getLikeIndex() == 0){ // 즐겨찾기 수가 0일경우 삭제
                productLikeRepository.delete(productLike);
            } else {    // 약국의 즐겨찾기수가 1이상이면 save
                productLikeRepository.save(productLike);
            }
            log.info(product);
            log.info(likePh);
            log.info("즐겨찾기 취소");
        }

    }
}
