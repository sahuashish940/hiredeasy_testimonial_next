import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Preview({ formData, submitForm, prevStep }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm(); // Call the actual submit function
      toast.success("Your testimonial has been submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("An error occurred while submitting. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ background: "#f8f8f8" }}>
      <div
        className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
        style={{ maxWidth: "600px", width: "100%", height: "auto" }}
      >
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-gray-900 mb-8">Thank You!</h3>
              <p className="text-lg text-gray-600 mb-6">Your testimonial has been submitted successfully.</p>
              <button
                type="button"
                onClick={() => window.close()}
                className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:from-gray-800 hover:to-black transition-transform transform active:scale-95 duration-300"
              >
                Close Tab
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-center mb-6 p-8">Testimonial Preview</h3>
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 relative shadow-xl">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <img
                    src={formData.profileImage || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full border-4 border-black shadow-md"
                  />
                </div>
                {formData.companyLogo && (
                  <div className="absolute top-4 right-4">
                    <img
                      src={formData.companyLogo}
                      alt="Company Logo"
                      className="w-16 h-16 object-contain rounded-lg border border-gray-300 shadow-sm"
                    />
                  </div>
                )}
                <div className="text-center mt-16">
                  <h4 className="text-3xl font-bold text-black mb-2">{formData.position}</h4>
                  <p className="text-lg text-gray-600 font-medium">{formData.location}</p>
                </div>
                <p className="text-gray-600 mt-6 text-center italic text-lg">"{formData.description}"</p>
                <div className="flex justify-center mt-6">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:from-gray-800 hover:to-black transition duration-300 shadow-lg"
                    onClick={() => window.open(formData.linkedinURL || "#", "_blank")}
                  >
                    View Profile
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => prevStep(2)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition duration-300 shadow-lg"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:from-gray-800 hover:to-black transition-transform transform active:scale-95 duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
