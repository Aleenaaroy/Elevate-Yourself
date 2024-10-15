import { Admin } from '../models/AdminModel'; // Adjust the import based on your project structure

declare global {
    namespace Express {
        interface Request {
            admin?: Admin; // Add the 'admin' property to the Request interface
        }
    }
}