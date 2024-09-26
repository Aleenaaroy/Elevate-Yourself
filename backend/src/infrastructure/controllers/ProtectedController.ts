// backend\src\infrastructure\controllers\ProtectedController.ts
import { AuthenticatedRequest } from '../../types/ExpressRequest';
import { Request, Response } from 'express';

// Sample protected route for testing JWT authentication
export const getProtectedData = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    res.status(200).json({
        message: 'Protected Data Accessed Successfully',
        user: req.user, // This contains the decoded JWT payload
    });
};


// User Portal handler
export const userPortal = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    // Assuming req.user contains user information (e.g., decoded from JWT)
    const user = req.user as any;

    if (user.role !== 'User') {
        return res.status(403).json({ message: 'Access forbidden: User role required' });
    }

    // Simulate fetching user portal data from a database or other source
    const userPortalData = {
        userId: user.id,
        name: user.name,
        dashboard: {
            recentActivities: [
                'Applied for Software Engineer position',
                'Updated profile picture',
                'Posted a new comment in a discussion thread',
            ],
        },
    };

    res.status(200).json({ message: 'User Portal Data', data: userPortalData });
};

// Admin Portal handler
export const adminPortal = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const user = req.user as any;

    if (user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access forbidden: Admin role required' });
    }

    // Simulate fetching admin portal data from a database or other source
    const adminPortalData = {
        adminId: user.id,
        name: user.name,
        dashboard: {
            userStats: {
                totalUsers: 1200,
                newUsersToday: 15,
                reportedIssues: 3,
            },
            recentAdminActions: [
                'Banned user JohnDoe for inappropriate behavior',
                'Approved new job post for Company XYZ',
                'Resolved issue #543 in the support forum',
            ],
        },
    };

    res.status(200).json({ message: 'Admin Portal Data', data: adminPortalData });
};
