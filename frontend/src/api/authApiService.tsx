//frontend\src\api\authApiService.tsx
import { axiosInstance } from "./axiosInstance";
import { AxiosError } from 'axios';

interface UserData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}


export const signUp = async(userData: UserData , otp: string, isNotOtp: boolean) => {
    try {
        console.log('UserData:', userData);
     let response ;

    if (isNotOtp) {
        response = await axiosInstance.post('/auth/register', userData, 
            { headers: { 'Content-Type': 'application/json' } });
    } else {
        response = await axiosInstance.post('/auth/verify-otp', { ...userData, otp });
    }
    return response;
    }catch (error) {
        // Check if the error is an AxiosError
        if (error instanceof AxiosError) {
            console.error('Axios error:', error.response?.data || error.message);
        } else if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error', error);
        }
        throw error;
    }}



export const login = async (userData: UserData) => {
    const response = await axiosInstance.post('/auth/login' ,  userData, 
        { headers: { 'Content-Type': 'application/json' } });
    return response;
}

export const manageGoogleAuth = async (purpose: string) => {
    let response;
    if(purpose === 'signup') {
        response = await axiosInstance.post('/auth/google');

    } else if (purpose === 'login') {
        response = await axiosInstance.post('/auth/google/login');
    }
    return response;
}