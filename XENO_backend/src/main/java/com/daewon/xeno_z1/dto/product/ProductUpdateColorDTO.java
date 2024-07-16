package com.daewon.xeno_z1.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductUpdateColorDTO {

    private Long productColorId;
<<<<<<< HEAD
    private String color;
    private List<ProductSizeDTO> size;
}
=======
    private List<ProductSizeDTO> size;

}

>>>>>>> Product_Detail_Page2
