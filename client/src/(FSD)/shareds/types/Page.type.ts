interface PageResponseDTO<T> {
    imageList: T;
    pageRequestDTO: PageRequestDTO;
    totalIndex: number;
  }
  
  interface PageRequestDTO {
    pageIndex: number;
    size: number;
  }
  
