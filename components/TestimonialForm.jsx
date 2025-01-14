import { useState } from 'react';
import { FaUser, FaEnvelope, FaBriefcase, FaMapMarkerAlt, FaLinkedin, FaFileImage } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TestimonialForm({ formData, setFormData, nextStep }) {
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const steps = [
    "Personal Details",
    "Professional Details",
    "Upload Files",
  ];

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.clientName.trim()) return "Client Name is required.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return "A valid Email is required.";
        break;
        case 2:
          if (!formData.description.trim()) return "Description is required.";
          if (!formData.position.trim()) return "Position is required.";
          if (!formData.location.trim()) return "Location is required.";
          if (
            formData.linkedinURL &&
            !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedinURL)
          ) {
            return "A valid LinkedIn URL is required.";
          }
          break;
                if (!formData.description.trim()) return "Description is required.";
        if (
          formData.linkedinURL &&
          !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedinURL)
        ) {
          return "A valid LinkedIn URL is required.";
        }
        break;
      case 3:
        if (!formData.profileImage) return "Profile Image is required.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleNext = () => {
    const errorMessage = validateStep();
    if (errorMessage) {
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        setError('Only JPG, JPEG, and PNG formats are allowed.');
        toast.error('Only JPG, JPEG, and PNG formats are allowed.', {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB.');
        toast.error('File size must be less than 5MB.', {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result });
        toast.success(`${field === 'profileImage' ? 'Profile Image' : 'Company Logo'} uploaded successfully!`, {
          position: "top-center",
          autoClose: 2000,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateAllSteps = () => {
    for (let i = 1; i <= steps.length; i++) {
      setStep(i);
      const errorMessage = validateStep();
      if (errorMessage) {
        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return false;
      }
    }
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Client Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                  required
                />
              </div>
            </div>
          </div>
        );
        case 2:
          return (
            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  placeholder="Share your experience"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                  rows="4"
                  required
                ></textarea>
              </div>
        
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Position</label>
                <input
                  type="text"
                  placeholder="Enter your position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                  required
                />
              </div>
        
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                  required
                />
              </div>
        
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">LinkedIn URL</label>
                <div className="relative">
                  <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    value={formData.linkedinURL}
                    onChange={(e) => setFormData({ ...formData, linkedinURL: e.target.value })}
                    className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                    required
                  />
                </div>
              </div>
            </div>
          );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Upload Profile Image</label>
              <div className="relative flex items-center">
                <FaFileImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'profileImage')}
                  className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                  required
                />
              </div>
              {formData.profileImage && (
                <img src={formData.profileImage} alt="Profile Preview" className="mt-4 w-32 h-32 object-cover rounded-full" />
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Upload Company Logo (Optional)</label>
              <div className="relative flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'companyLogo')}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                />
              </div>
              {formData.companyLogo && (
                <img src={formData.companyLogo} alt="Company Logo Preview" className="mt-4 w-32 h-32 object-cover rounded" />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ background: "#f8f8f8" }}>
      <div
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl border border-gray-300"
        style={{ maxWidth: "960px" }}
      >
        {/* Navigation Bar */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 flex flex-col border-r border-gray-300">
          <h3 className="text-lg font-bold mb-4">Steps</h3>
          <ul className="space-y-3">
            {steps.map((stepName, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg cursor-pointer flex items-center space-x-2 transition-transform transform active:scale-95 duration-300 ${
                  step === index + 1 ? 'bg-gradient-to-r from-black to-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-black hover:to-gray-800 hover:text-white'
                }`}
                onClick={() => setStep(index + 1)}
              >
                <span className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  step === index + 1 ? 'bg-white text-black' : 'bg-gray-300 text-gray-700'
                } font-bold`}>{index + 1}</span>
                <span>{stepName}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-gradient-to-r from-black to-gray-800 h-2 rounded-full"
                style={{ width: `${(step / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6 md:p-8">
          <div className="relative">
            <h3 className="text-2xl font-bold text-center mb-6">Submit Your Testimonial</h3>
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
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:bg-black hover:text-white focus:ring-2 focus:ring-gray-600 transition-transform transform active:scale-95 duration-300"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (validateAllSteps()) {
                      nextStep();
                    }
                  }}
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
