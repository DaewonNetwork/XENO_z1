package com.daewon.xeno_z1;

import com.daewon.xeno_z1.domain.ProductsDetailImage;
import com.daewon.xeno_z1.repository.ProductsDetailImageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class ProductsDetailImageRepositoryTest {

    @Autowired
    private ProductsDetailImageRepository repository;

    @Test
    public void testFindByProductId() {
        // Given
        Long productId = 1L;
        Pageable pageable = PageRequest.of(0, 10, Sort.by("productId").descending());

        // When
        Page<ProductsDetailImage> page = repository.findByProductId(productId, pageable);

        // Then
        assertNotNull(page);
        assertEquals(1, page.getNumber()); // 페이지 번호 확인
        assertEquals(10, page.getSize()); // 페이지 크기 확인
    }
}
