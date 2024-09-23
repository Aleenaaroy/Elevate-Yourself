// frontend\src\pages\auth\OtpSend.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../api/axiosInstance';

const OtpSend: React.FC = () => {
  const [contactInfo, setContactInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axiosInstance.post('/auth/send-otp', {
        contactInfo,
      });

      if (response.data.success) {
        toast.success('OTP sent successfully');
        navigate('/otp-verify', { state: { contactInfo } });
      } else {
        toast.error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Send OTP</h1>
      <form onSubmit={handleOtpSend} className="w-1/3">
        <div className="mb-4">
          <label htmlFor="contactInfo" className="block text-gray-700 font-medium mb-2">
            Enter your phone number or email
          </label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Phone or Email"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default OtpSend;
