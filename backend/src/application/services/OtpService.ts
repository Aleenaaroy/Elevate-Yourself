//backend\src\application\services\OtpService.ts
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { UserRepository } from '../../domain/repositories/UserRepository';


export class OtpService {
    private transporter;

    constructor(private userRepository: UserRepository) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS, // your email password
            }
        });
    }

    public async sendOtp(email: string): Promise<string> {
        const otp = crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate 6-character OTP

        // Save OTP in the user's record (you can save it in a separate field or collection)
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        // Set OTP expiration to 10 minutes from now
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 10);

        // Save OTP and expiration in the database
        await this.userRepository.saveOtp(user.id!, otp, otpExpires); // Assuming saveOtp accepts both otp and otpExpires

        // Send OTP email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It expires in 10 minutes.`
        };

        await this.transporter.sendMail(mailOptions);

        return otp;
    }

    public async verifyOtp(userId: string, otp: string): Promise<boolean> {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Ensure both otp and otpExpires exist
        if (!user.otp || !user.otpExpires) {
            throw new Error('OTP data missing');
        }

        // Check if the provided OTP matches and is still valid
        if (user.otp !== otp) {
            throw new Error('Invalid OTP');
        }

        // Check if the OTP is expired
        if (user.otpExpires <= new Date()) {
            throw new Error('OTP has expired');
        }

        return true;
    }
}
