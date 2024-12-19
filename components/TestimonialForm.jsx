import { useState } from 'react';
import { FaUser, FaEnvelope, FaBriefcase, FaMapMarkerAlt, FaLinkedin, FaFileImage } from 'react-icons/fa';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TestimonialForm({ formData, setFormData, nextStep }) {
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.clientName.trim()) return "Client Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return "A valid Email is required.";
    if (!formData.description.trim()) return "Description is required.";
    if (
      formData.linkedinURL &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedinURL)
    ) {
      return "A valid LinkedIn URL is required.";
    }
    if (!formData.position.trim()) return "Position at Company is required.";
    if (!formData.location.trim()) return "Location is required.";
    if (!formData.profileImage) return "Profile Image is required.";
    return null; // No errors
  };

  const handleNext = () => {
    const errorMessage = validateForm();
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
    toast.success('Form validated successfully!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    nextStep();
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8 border border-gray-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Submit Your Testimonial
        </h3>
        <form className="space-y-4 sm:space-y-6">
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
            <label className="text-gray-700 font-medium mb-2">LinkedIn URL</label>
            <div className="relative">
              <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={formData.linkedinURL}
                onChange={(e) => setFormData({ ...formData, linkedinURL: e.target.value })}
                className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Position at Company</label>
            <div className="relative">
              <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="e.g., Software Engineer"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Location</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="e.g., New York, USA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                required
              />
            </div>
          </div>

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

          <button
            type="button"
            onClick={handleNext}
            disabled={
              !formData.clientName ||
              !formData.email ||
              !formData.description ||
              !formData.position ||
              !formData.location ||
              !formData.profileImage
            }
            className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-purple-600 hover:to-indigo-500 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
