//backend\src\application\services\OtpService.ts
import nodemailer, { Transporter } from 'nodemailer';
import crypto from 'crypto';
import { google } from 'googleapis';
import { UserRepository } from '../../domain/repositories/UserRepository';


const OAuth2 = google.auth.OAuth2;

export class OtpService {
    private transporter!: Transporter; // Non-null assertion to prevent TypeScript error

    constructor(private userRepository: UserRepository) {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID, // Google OAuth Client ID
            process.env.CLIENT_SECRET, // Google OAuth Client Secret
            'https://developers.google.com/oauthplayground' // Redirect URL
        );

        if (!process.env.REFRESH_TOKEN) {
            throw new Error('Missing REFRESH_TOKEN in environment variables');
        }

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN, // Google OAuth Refresh Token
        });

        // Get Access Token asynchronously
        oauth2Client.getAccessToken().then((accessToken) => {
            if (!accessToken?.token) {
                throw new Error('Failed to generate access token');
            }
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.EMAIL_USER, // Your email address
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken.token, // Use the generated access token
                },
            });
        }).catch((error) => {
            console.error('Failed to create access token:', error.message);
        });
    }

    public async sendOtp(email: string): Promise<string> {
        const otp = crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate 6-character OTP

        // Save OTP in the user's record (you can save it in a separate field or collection)
        const user = await this.userRepository.findUserByEmail(email);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 10);

        // Save OTP and expiration in the database
        await this.userRepository.saveOtp(user.id!, otp, otpExpires); 


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
            throw new Error('OTP or OTP expiry missing');
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
