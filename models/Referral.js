import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
    referrerName: { type: String, required: true },
    referrals: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            university: { type: String, required: true },
        },
    ],
});

export default mongoose.models.Referral || mongoose.model('Referral', ReferralSchema);
