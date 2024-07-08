export const fetchAllReviewImages = async () => {
    const response = await fetch('http://localhost:8090/reviews/images');
    if (!response.ok) {
        throw new Error('모든 리뷰 이미지를 불러오는데 실패했습니다.');
    }
    return await response.json();
};