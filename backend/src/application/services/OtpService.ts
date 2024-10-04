import nodemailer from 'nodemailer';

const NODEMAIL_EMAIL = process.env.NODEMAIL_EMAIL as string;
const NODEMAIL_PASS_KEY = process.env.NODEMAIL_PASS_KEY as string;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAIL_EMAIL,
        pass: NODEMAIL_PASS_KEY,
    },
    tls: {
        rejectUnauthorized: false,
    },
});


export const sendVerificationEmail = async (userEmailId: string): Promise<{ otpValue: number; result: boolean }> => {
    try {
        const otpValue = Math.floor(Math.random() * 1000000); // Generate a random OTP

        const mailContent = {
            from: NODEMAIL_EMAIL, // Use environment variable for the sender's email
            to: userEmailId,
            subject: 'OTP Verification',
            html: `
                <h2>Your Verification OTP for Elevate Registration</h2>
                <h3>Here is your otp:</h3>
                <h1>${otpValue}</h1>
            `,
        };

        await transporter.sendMail(mailContent); // Send the email
        return { otpValue, result: true }; // Return the OTP and success status
    } catch (error) {
        console.error(error, 'Mail send error');
        return { otpValue: 0, result: false }; // Return failure status
    }
};
