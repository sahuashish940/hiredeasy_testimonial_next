import { useState } from 'react';
import TestimonialForm from '../components/TestimonialForm';
import ReferralForm from '../components/ReferralForm';
import Preview from '../components/Preview';

export default function Home() {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const [formData, setFormData] = useState({
        clientName: '',
        email: '',
        description: '',
        linkedinURL: '',
        position: '',
        location: '',
        profileImage: '',
        companyLogo: '',
        referrals: [
            {
                name: '',
                email: '',
                phone: '',
                university: '',
            },
        ],
    });

    const submitForm = async () => {
        try {
            const referralData = {
                referrerName: formData.clientName,
                referrals: formData.referrals,
            };

            const testimonialResponse = await fetch('/api/testimonial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientName: formData.clientName,
                    email: formData.email,
                    description: formData.description,
                    linkedinURL: formData.linkedinURL,
                    position: formData.position,
                    location: formData.location,
                    profileImage: formData.profileImage,
                    companyLogo: formData.companyLogo,
                }),
            });

            if (!testimonialResponse.ok) {
                throw new Error('Failed to save testimonial');
            }

            const referralResponse = await fetch('/api/referral', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(referralData),
            });

            if (!referralResponse.ok) {
                throw new Error('Failed to save referral');
            }

            alert('Submitted successfully!');
        } catch (error) {
            console.error(error);
            alert('Submission failed! Please try again.');
        }
    };

    return (
        
        <div>
            {step === 1 && (
                <TestimonialForm
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                />
            )}
            {step === 2 && (
                <ReferralForm
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}
            {step === 3 && (
                <Preview
                    formData={formData}
                    submitForm={submitForm}
                    prevStep={prevStep}
                />
            )}
        </div>
    );
}
