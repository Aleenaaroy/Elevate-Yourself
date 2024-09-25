// frontend\src\pages\auth\OtpVerify.tsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast ,Toaster} from 'react-hot-toast';
import { axiosInstance } from '../../api/axiosInstance';

const OtpVerify: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { contactInfo } = location.state || { contactInfo: null };

  if (!contactInfo) {
    navigate('/send-otp');
    return null;
  }

  const handleOtpVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/verify-otp', {
        contactInfo,
        otp,
      });

      if (response.data.success) {
        toast.success('OTP verified successfully');
        navigate('/feed'); // Redirect to dashboard or desired page
      } else {
        toast.error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Toaster position="top-right" />
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <form onSubmit={handleOtpVerify} className="w-1/3">
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
            Enter the OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="OTP"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
    </>
  );
};

export default OtpVerify;
