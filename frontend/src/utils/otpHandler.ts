import Swal from 'sweetalert2';
import { useState } from 'react';

// Custom hook
export const useOtpHandler = () => {
    const [otp, setOtp] = useState<string>("");

    const showOtpModal = async () => {
        const { value: userOtp } = await Swal.fire({
            title: 'Enter OTP',
            input: 'text',
            inputLabel: 'OTP',
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            inputPlaceholder: 'Enter your OTP',
            confirmButtonText: 'Submit',
            preConfirm: (otp) => {
                if (!otp) {
                Swal.showValidationMessage('Please enter OTP');
                }
                return otp;
            },
        });

        if(userOtp) {
            setOtp(userOtp);
        }
        return userOtp;
    }

    return {
        otp,        // Returning otp state
        showOtpModal
    }
}


