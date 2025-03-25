import React from 'react';
import APP_CONFIG from '../config/AppConfig';

// 인증 설정을 위한 인터페이스 정의
export interface ChzzkAuthConfig {
    clientId: string;
    redirectUri: string;
    state: string;
    authBaseUrl: string;
}

// 인증 설정 상수
const AUTH_CONFIG: ChzzkAuthConfig = {
    clientId: '0aa21664-c1d8-4a6b-907c-f2d7d660bdd0',
    redirectUri: 'http://localhost:8080/callback',
    state: 'zxclDasdfA25',
    authBaseUrl: 'https://chzzk.naver.com/account-interlock'
};

const ChzzkLoginButton: React.FC = () => {
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

    return (
        <button onClick={handleLogin} style={buttonStyles} aria-label="치지직으로 로그인">
            <svg style={iconStyles} viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#00FFA3" />
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="white" />
            </svg>
            치지직으로 로그인
        </button>
    );
};

const buttonStyles: React.CSSProperties = {
    padding: '14px 28px',
    fontSize: '16px',
    backgroundColor: '#00ffa3',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 255, 163, 0.2)',
    margin: '10px 0',
};

const iconStyles: React.CSSProperties = {
    width: '20px',
    height: '20px',
};

export default ChzzkLoginButton;
