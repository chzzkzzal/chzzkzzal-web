import axios from 'axios';
import exp from "constants";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 실제 서버 주소/포트에 맞추어 변경
    withCredentials: true // 반드시 이 설정이 있어야 쿠키 전송됨
});
// Page<T> 제네릭 타입 (스프링 Page 객체 직렬화 구조 기준)
export interface Page<T> {
    content: T[];
    number: number;       // 현재 페이지
    size: number;         // 요청한 size
    totalElements: number;
    totalPages: number;
}
// 백엔드가 내려주는 짤 요약 DTO 예시
export interface ZzalSummaryResponse {
    id: number;
    title: string;
    thumbnailUrl: string;
    // 필요한 필드 추가
}

export class ZzalHashtagRepository{

    /** 짤에 태그 달기 */
    async tagZzal(zzalId: number, tags: string[]): Promise<void> {
        if (isNaN(zzalId)) {
            throw new Error("zzalId must be a valid number");
        }
        await apiClient.post(`/api/zzals/${zzalId}/tags`, { tags });
    }
    /** 태그·키워드 검색 */
    async search(keyword: string, page = 0, size = 20): Promise<Page<ZzalSummaryResponse>> {
        const res = await apiClient.get('/api/zzals/search', {
            params: { keyword, page, size }
        });
        return res.data;
    }

    /** 특정 짤의 모든 태그 조회 (GET /api/zzals/{id}/tags) */
    async getTags(zzalId: number): Promise<string[]> {
        const res = await apiClient.get(`/api/zzals/${zzalId}/tags`);
        // null 가능성 방어
        return Array.isArray(res.data) ? res.data : [];
    }


}

// 인스턴스 싱글턴 활용 예시
const zzalHashtagRepository = new ZzalHashtagRepository();
export default zzalHashtagRepository;
