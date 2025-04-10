import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 실제 서버 주소/포트에 맞추어 변경
    withCredentials: true // 반드시 이 설정이 있어야 쿠키 전송됨
});

// Page<T> 제네릭 타입 (스프링 Page 객체 직렬화 구조 기준)
export interface Page<T> {
    content: T[];
    number: number; // 현재 페이지
    size: number; // 요청한 size
    totalElements: number;
    totalPages: number;
}

// 백엔드가 내려주는 짤 요약 DTO
export interface ZzalSummaryResponse {
    id: number;
    title: string;
    thumbnailUrl: string;
    // 필요한 필드 추가
}

export class ZzalHashtagRepository {
    /**
     * 짤에 태그 달기
     * @param zzalId 태그를 달 짤 ID
     * @param tags 추가할 태그 배열
     */
    async tagZzal(zzalId: number, tags: string[]): Promise<void> {
        if (isNaN(zzalId)) {
            throw new Error("zzalId must be a valid number");
        }
        await apiClient.post(`/api/zzals/${zzalId}/tags`, { tags });
    }

    /**
     * 태그·키워드로 짤 검색
     * @param keyword 검색어
     * @param page 페이지 번호 (0부터 시작)
     * @param size 페이지 크기
     */
    async search(keyword: string, page = 0, size = 20): Promise<Page<ZzalSummaryResponse>> {
        const res = await apiClient.get('/api/zzals/search', {
            params: { keyword, page, size }
        });
        return res.data;
    }

    /**
     * 특정 짤의 모든 태그 조회
     * @param zzalId 조회할 짤 ID
     */
    async getTags(zzalId: number): Promise<string[]> {
        const res = await apiClient.get(`/api/zzals/${zzalId}/tags`);
        // 백엔드에서 전체 응답을 래핑해 주므로, 실제 태그 배열은 res.data.result에 들어 있음
        const { result } = res.data;
        return Array.isArray(result) ? result : [];
    }

}

// 싱글턴 인스턴스 생성
const zzalHashtagRepository = new ZzalHashtagRepository();
export default zzalHashtagRepository;
