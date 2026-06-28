import { Request, Response, NextFunction } from 'express';
import { requireAuth, getAuth } from '@clerk/express';
import { User } from '../models/User';

// Extend Express Request object to include user details
export interface AuthRequest extends Request {
  auth?: Record<string, any>;
  user?: any; // The database user document
}

// Ensure the request has a valid Clerk session
export const protect = requireAuth({
  signInUrl: process.env.FRONTEND_URL || 'http://localhost:3000/sign-in',
});

// Middleware to load user from database and attach it to req.user
export const loadUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = getAuth(req);
    
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized', errors: null });
      return;
    }

    const user = await User.findOne({ clerkId: userId });
    
    // If user doesn't exist in our DB yet, but they have a valid clerk session,
    // they might have just signed up. We could create them or wait for the webhook.
    // Assuming webhook creates the user, we return 401 if not found.
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found in database', errors: null });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error in loadUser', errors: [{ message: (error as Error).message }] });
  }
};

// RBAC Middleware
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges', errors: null });
      return;
    }
    next();
  };
};
