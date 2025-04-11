import React, { useEffect, useState } from "react";
import authRepository from "../api/server/AuthRepository"; // AuthRepository 싱글턴 인스턴스 임포트
import AUTH_CONFIG, { ChzzkAuthConfig } from "../config/AppConfig"; // 민감설정 정보 파일에서 import
import "./ChzzkLoginButton.css";

const ChzzkLoginButton: React.FC = () => {
    // 로그인 여부 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                // AuthRepository를 통해 로그인 여부 확인
                const loggedIn = await authRepository.checkLogin();
                console.log("로그인 여부", loggedIn);
                setIsLoggedIn(loggedIn);
            } catch (error) {
                console.error("로그인 체크 오류:", error);
                setIsLoggedIn(false);
            }
        };
        checkLogin();
    }, []);

    // 로그인 버튼 클릭 => 인증 URL 이동
    const handleLogin = () => {
        try {
            const url = new URL(AUTH_CONFIG.authBaseUrl);
            url.searchParams.set('clientId', AUTH_CONFIG.clientId);
            url.searchParams.set('redirectUri', AUTH_CONFIG.redirectUri);
            url.searchParams.set('state', AUTH_CONFIG.state);
            window.location.href = url.toString();
        } catch (error) {
            console.error('Error constructing auth URL:', error);
            alert('로그인 요청을 처리하는 중 오류가 발생했습니다.');
        }
    };

    // 로그아웃 버튼 클릭 => AuthRepository의 logout() 메서드 호출
    const handleLogout = async () => {
        try {
            await authRepository.logout();
            // 로그아웃 후 메인 페이지로 이동 또는 새로고침 처리
            window.location.href = '/';
        } catch (error) {
            console.error('Failed to logout:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    // 렌더링 분기: 로그인 상태에 따라 다른 버튼 표시
    if (isLoggedIn) {
        // 로그인 상태: "로그아웃" 버튼 렌더링
        return (
            <button
                onClick={handleLogout}
                className="chzzk-login-button"
                aria-label="치지직에서 로그아웃"
            >
                <svg className="chzzk-login-icon" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#00FFA3"
                    />
                    <path
                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        fill="white"
                    />
                </svg>
                로그아웃
            </button>
        );
    } else {
        // 미로그인: "로그인" 버튼 렌더링
        return (
            <button
                onClick={handleLogin}
                className="chzzk-login-button"
                aria-label="치지직으로 로그인"
            >
                <svg className="chzzk-login-icon" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#00FFA3"
                    />
                    <path
                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        fill="white"
                    />
                </svg>
                치지직으로 로그인
            </button>
        );
    }
};

export default ChzzkLoginButton;
