import dbConnect from '../../lib/mongodb';
import Testimonial from '../../models/Testimonial';
import cloudinary from '../../lib/cloudinary';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { profileImage, companyLogo, ...data } = req.body;

            // Upload profileImage to Cloudinary
            const profileImageResult = await cloudinary.uploader.upload(profileImage, {
                folder: 'testimonials',
            });

            // Optionally upload companyLogo to Cloudinary
            let companyLogoResult = null;
            if (companyLogo) {
                companyLogoResult = await cloudinary.uploader.upload(companyLogo, {
                    folder: 'testimonials',
                });
            }

            // Save data to MongoDB
            const testimonial = new Testimonial({
                ...data,
                profileImage: profileImageResult.secure_url, // Use the Cloudinary URL
                companyLogo: companyLogoResult ? companyLogoResult.secure_url : '',
            });

            await testimonial.save();

            res.status(201).json({ message: 'Testimonial saved successfully!' });
        } catch (error) {
            console.error('Error saving testimonial:', error);
            res.status(500).json({ error: 'Failed to save testimonial' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
