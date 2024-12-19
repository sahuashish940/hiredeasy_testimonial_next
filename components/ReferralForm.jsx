import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReferralForm({ formData, setFormData, nextStep, prevStep }) {
  const addReferral = () => {
    setFormData({
      ...formData,
      referrals: [...formData.referrals, { name: "", email: "", phone: "", university: "" }],
    });
    toast.success("New referral field added successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const skipStep = async () => {
    try {
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // Send an empty payload
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Referral step skipped successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        nextStep(); // Proceed to the next step
      } else {
        toast.error("Failed to skip referral step. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error skipping referral:', error);
      toast.error("An error occurred while skipping the referral step.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8 border border-gray-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Refer Your Friends
        </h3>
        <form className="space-y-6">
          {formData.referrals.map((ref, index) => (
            <div key={index} className="space-y-4 border-b border-gray-300 pb-4 mb-4">
              <input
                type="text"
                placeholder="Friend's Name"
                value={ref.name}
                onChange={(e) => {
                  const newReferrals = [...formData.referrals];
                  newReferrals[index].name = e.target.value;
                  setFormData({ ...formData, referrals: newReferrals });
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="email"
                placeholder="Friend's Email"
                value={ref.email}
                onChange={(e) => {
                  const newReferrals = [...formData.referrals];
                  newReferrals[index].email = e.target.value;
                  setFormData({ ...formData, referrals: newReferrals });
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={ref.phone}
                onChange={(e) => {
                  const newReferrals = [...formData.referrals];
                  newReferrals[index].phone = e.target.value;
                  setFormData({ ...formData, referrals: newReferrals });
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="text"
                placeholder="University"
                value={ref.university}
                onChange={(e) => {
                  const newReferrals = [...formData.referrals];
                  newReferrals[index].university = e.target.value;
                  setFormData({ ...formData, referrals: newReferrals });
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          ))}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={addReferral}
              className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Add Friend
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!formData.referrals.every(ref => ref.name && ref.email && ref.phone && ref.university)}
              className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              type="button"
              onClick={skipStep}
              className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
