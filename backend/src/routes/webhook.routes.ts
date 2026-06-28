import { Router, Request, Response } from 'express';
import { Webhook } from 'svix';
import { User } from '../models/User';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).json({
      success: false,
      message: 'Error occured -- no svix headers',
    });
    return;
  }

  // Get the body
  const payload = req.body;
  const body = payload.toString('utf8');

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    res.status(400).json({
      success: false,
      message: 'Error occured',
    });
    return;
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { email_addresses, first_name, last_name, image_url } = evt.data;
    
    const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : '';
    const name = `${first_name || ''} ${last_name || ''}`.trim();

    try {
      await User.findOneAndUpdate(
        { clerkId: id },
        { 
          clerkId: id,
          email,
          name,
          image: image_url
        },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error syncing user to database', error);
      res.status(500).json({ success: false, message: 'Database error' });
      return;
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
      console.error('Error deleting user from database', error);
      res.status(500).json({ success: false, message: 'Database error' });
      return;
    }
  }

  res.status(200).json({
    success: true,
    message: 'Webhook received'
  });
});

export default router;
