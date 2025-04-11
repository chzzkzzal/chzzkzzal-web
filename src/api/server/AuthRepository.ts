// src/api/server/AuthRepository.ts
import axios from 'axios';

/**
 * Axios 클라이언트 설정
 *  - baseURL: 백엔드 서버 주소
 *  - withCredentials: 세션 쿠키를 사용하기 위해 true로 설정
 */
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 실제 서버 주소/포트에 맞추어 변경
    withCredentials: true
});

/**
 * 서버 응답 래핑: { status, code, message, result }
 * 상황에 맞게 필요 필드를 커스텀하셔도 됩니다.
 */
export interface CustomResponse<T> {
    status: string;
    code: string;
    message: string;
    result: T;
}
// 서버 응답 타입 정의 추가
interface LoginCheckResponse {
    loggedIn: boolean;
}


/**
 * 인증 관련 레포지토리
 */
export class AuthRepository {
    /**
     * 로그인 여부 확인
     * 서버가 { status, code, message, result: boolean } 구조를 반환한다고 가정
     */
    async checkLogin(): Promise<boolean> {
        const response = await apiClient.get<CustomResponse<LoginCheckResponse>>('/api/auth/check');
        // 응답 구조에 맞게 수정
        return response.data.result.loggedIn;
    }

    /**
     * 로그아웃
     */
    async logout(): Promise<void> {
        await apiClient.post('/api/auth/logout');
    }

    /**
     * (선택) 기타 인증 관련 메서드
     * 예: refreshToken(), getUserInfo() 등...
     */
    // async refreshToken(): Promise<void> {
    //   ...
    // }
}

// 싱글턴 인스턴스 생성 후 내보내기
const authRepository = new AuthRepository();
export default authRepository;
