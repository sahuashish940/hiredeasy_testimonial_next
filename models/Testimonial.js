import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  linkedinURL: String,
  position: { type: String, required: true },
  location: { type: String, required: true },
  profileImage: { type: String, required: true }, // Ensure this is a string URL or path
  companyLogo: String,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
