import dbConnect from '../../lib/mongodb';
import Referral from '../../models/Referral';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            // Check if the request body has referral data
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(200).json({ message: 'Referral process skipped successfully!' });
            }

            // Validate referral data (optional: you can expand the validation)
            const { name, email, phone, university } = req.body;

            // If referral data is incomplete, treat it as skipped
            if (!name && !email && !phone && !university) {
                return res.status(200).json({ message: 'Referral process skipped successfully!' });
            }

            // Save the referral if data is present
            const referral = new Referral(req.body);
            await referral.save();

            res.status(201).json({ message: 'Referral saved successfully!' });
        } catch (error) {
            console.error('Error saving referral:', error);
            res.status(500).json({ error: 'Failed to save referral' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
