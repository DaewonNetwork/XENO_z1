import Link from "next/link"
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>상품 정보가 없습니다.</p>
      <Link href="/">돌아가기</Link>
    </div>
  )
}