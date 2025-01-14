import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReferralForm({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
  const [step, setStep] = useState(1);

  const steps = ["Add Referrals", "Review & Submit"];

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.referrals.length ||
        !formData.referrals.every(
          (ref) => ref.name && ref.email && ref.phone && ref.university
        )
      ) {
        return "All referral fields are required.";
      }
    }
    return null;
  };

  const handleNext = () => {
    const errorMessage = validateStep();
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    setStep(step + 1);
  };

  const addReferral = () => {
    setFormData({
      ...formData,
      referrals: [
        ...formData.referrals,
        { name: "", email: "", phone: "", university: "" },
      ],
    });
    toast.success("New referral field added successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const removeReferral = (index) => {
    const updatedReferrals = formData.referrals.filter((_, i) => i !== index);
    setFormData({ ...formData, referrals: updatedReferrals });
    toast.info("Referral removed successfully.", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {formData.referrals.map((ref, index) => (
              <div
                key={index}
                className="space-y-4 border-b border-gray-300 pb-4 mb-4 relative"
              >
                <button
                  type="button"
                  onClick={() => removeReferral(index)}
                  className="absolute top-2 right-2 text-black font-bold text-lg hover:text-gray-800 transition-transform transform active:scale-95"
                  style={{ padding: "4px", borderRadius: "50%" }}
                >
                  ×
                </button>
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
            <button
              type="button"
              onClick={addReferral}
              className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:bg-black hover:text-white focus:ring-2 focus:ring-gray-600 transition-transform transform active:scale-95 duration-300"
            >
              Add Another Referral
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {formData.referrals && formData.referrals.length > 0 ? (
              formData.referrals.map((ref, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg bg-gray-50 space-y-2"
                >
                  <p>
                    <strong>Name:</strong> {ref.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {ref.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {ref.phone || "N/A"}
                  </p>
                  <p>
                    <strong>University:</strong> {ref.university || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No referrals added yet.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      style={{ background: "#f8f8f8" }}
    >
      <div
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
        style={{ maxWidth: "960px", height: "600px", width: "100%" }}
      >
        {/* Navigation Bar */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 flex flex-col border-r border-gray-300 hidden md:block relative">
          <h3 className="text-lg font-bold mb-4">Steps</h3>
          <ul className="space-y-3">
            {steps.map((stepName, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg cursor-pointer flex items-center space-x-2 transition-transform transform active:scale-95 duration-300 ${
                  step === index + 1
                    ? "bg-gradient-to-r from-black to-gray-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-black hover:to-gray-800 hover:text-white"
                }`}
                onClick={() => setStep(index + 1)}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    step === index + 1
                      ? "bg-white text-black"
                      : "bg-gray-300 text-gray-700"
                  } font-bold`}
                >
                  {index + 1}
                </span>
                <span>{stepName}</span>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-gradient-to-r from-black to-gray-800 h-2 rounded-full"
                style={{ width: `${(step / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6 md:p-8 overflow-auto">
          <div className="relative h-full">
            <h3 className="text-2xl font-bold text-center mb-6">
              Refer Your Friends
            </h3>
            {renderStep()}

            <div className="flex flex-col md:flex-row justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition duration-300 mb-3 md:mb-0"
                >
                  Previous
                </button>
              )}
              {step < steps.length ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, referrals: [] }); // Clear all referral data
                      setStep(step + 1); // Proceed to the next step
                    }}
                    className="px-6 py-3 bg-gray-300 text-black font-medium rounded-lg hover:bg-gray-400 hover:text-black focus:ring-2 focus:ring-gray-600 transition-transform transform active:scale-95 duration-300"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:bg-black hover:text-white focus:ring-2 focus:ring-gray-600 transition-transform transform active:scale-95 duration-300"
                  >
                    Next
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:bg-black hover:text-white focus:ring-2 focus:ring-gray-600 transition-transform transform active:scale-95 duration-300"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
