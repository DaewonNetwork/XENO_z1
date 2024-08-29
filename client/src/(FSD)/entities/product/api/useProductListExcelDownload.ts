const accessToken = localStorage.getItem("access_token");

export const download = async () => {
    try {
        const response = await fetch('http://localhost:8090/api/product/download/excel', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Blob 객체로 응답을 처리
        const blob = await response.blob();
        
        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);
        
        // 다운로드 링크를 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.xlsx'); // 파일 이름 설정
        
        // 링크를 클릭하여 다운로드 시작
        document.body.appendChild(link);
        link.click();
        
        // 링크를 DOM에서 제거
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error fetching and downloading the Excel file:', error);
        throw error; // 필요에 따라 에러를 처리합니다.
    }
};

export const newDownload = async () => {
    try {
        const response = await fetch('http://localhost:8090/api/product/download/new-excel', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Blob 객체로 응답을 처리
        const blob = await response.blob();
        
        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);
        
        // 다운로드 링크를 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.xlsx'); // 파일 이름 설정
        
        // 링크를 클릭하여 다운로드 시작
        document.body.appendChild(link);
        link.click();
        
        // 링크를 DOM에서 제거
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error fetching and downloading the Excel file:', error);
        throw error; // 필요에 따라 에러를 처리합니다.
    }
};