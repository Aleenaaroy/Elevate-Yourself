// backend\src\application\usecases\auth\AuthUseCases.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../domain/repositories/interfaces/IUserRepository';
import { ICompanyRepository } from '../../../domain/repositories/interfaces/ICompanyRepository';
import { sendVerificationEmail } from '../../services/OtpService';
import { User } from '../../../domain/entities/User';
import { Company } from '../../../domain/entities/Company';

export class AuthUseCases {
  private userRepository: IUserRepository;
  private companyRepository: ICompanyRepository;
  private globalStoredOtp: number | null = null;

  constructor(userRepo: IUserRepository, companyRepo: ICompanyRepository) {
    this.userRepository = userRepo;
    this.companyRepository = companyRepo;
  }

  async register(userData: Partial<User>): Promise<string> {
    const { name, email, phone, role, password } = userData;

    const existingUser = await this.userRepository.findUserByEmail(email!);
    const existingCompany = await this.companyRepository.findCompanyByEmail(email!);
    const existingMobile = await this.userRepository.findUserByPhone(phone!) ||
      await this.companyRepository.findCompanyByPhone(phone!);

    if (existingUser || existingCompany || existingMobile) {
      throw new Error('Account already exists');
    }

    const { otpValue, result } = await sendVerificationEmail(email as string);
    this.globalStoredOtp = otpValue;

    if (!result || !otpValue) {
      throw new Error('Verification email failed to send');
    }

    return 'Check email for OTP Verification';
  }

  async otpRegister(userData: Partial<User>, otp: number): Promise<User | Company> {
    const { name, email, phone, role, password } = userData;

    if (otp !== this.globalStoredOtp) {
      throw new Error('Invalid OTP');
    }

    const hashedPassword = await this.hashPassword(password as string);
    let createdEntity: User | Company;

    if (role === 'Candidate') {
      createdEntity = await this.userRepository.createUser({
        name: name,
        email,
        phone,
        role,
        password: hashedPassword
      } as User);
    } else {
      createdEntity = await this.companyRepository.createCompany({
        name: name,
        email,
        phone,
        role,
        password: hashedPassword
      } as Company);
    }

    this.globalStoredOtp = null;
    return createdEntity;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      const company = await this.companyRepository.findCompanyByEmail(email);
      if (!company) {
        throw new Error('Account does not exist');
      }

      if (company.isBlocked) {
        throw new Error('Account is blocked');
      }

      const matchPassword = await bcrypt.compare(password, company.password);
      if (!matchPassword) {
        throw new Error('Invalid Password');
      }

      return this.generateToken(company.id!, 'Company');
    }

    if (user.isBlocked) {
      throw new Error('Account is blocked');
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new Error('Invalid Password');
    }

    return this.generateToken(user.id!, 'User');
  }

  async googleSignup(name: string, email: string, profileImage: string, googleId: string): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error('User Already Exists');
    }

    const newUser: User = {
      name,
      email,
      profileImage,
      password: googleId,
      role: 'Candidate',
    };

    return this.userRepository.createUser(newUser);
  }

  async googleLogin(email: string): Promise<{ token: string, user: User }> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isBlocked) {
      throw new Error('Account is blocked');
    }

    const token = this.generateToken(user.id!, 'User');

    return { token, user };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private generateToken(userId: string, role: string): string {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
      expiresIn: role === 'User' ? '1h' : '2h',
    });
  }
}
