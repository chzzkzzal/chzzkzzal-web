import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true // 반드시 이 설정이 있어야 쿠키 전송됨
});
export default apiClient;
