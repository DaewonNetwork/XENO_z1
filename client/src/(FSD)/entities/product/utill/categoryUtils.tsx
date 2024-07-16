export const getCategoryID = (category:string) => {
    switch (category) {
        case "상의":
            return "001";
        case "하의":
            return "002";
        case "아우터":
            return "003";
        default:
            return "default-id";
    }
};

export const getCategorySubId = (categorySub:string) => {
    switch (categorySub) {
        case "반팔":
            return "001";
        case "긴팔":
            return "002";
        case "청바지":
            return "003";
        case "반바지":
            return "004";
        case "면":
            return "005";
        case "나일론":
            return "006";
        case "후드집업":
            return "007";
        case "코트":
            return "008";
        case "바람막이":
            return "009";
        case "패딩":
            return "010";
        case "자켓":
            return "011";
        default:
            return "999"; // 예외 처리 혹은 기타 경우에 대한 기본 값
    }
};