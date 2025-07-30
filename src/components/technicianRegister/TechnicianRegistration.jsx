import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import provider_img from "../../images/provider_img.jpg";
import styles from "./TechnicianRegistration.module.css";

const specializationOptions = [
  "Gaming PCs",
  "Workstations",
  "Custom Water Cooling",
  "Small Form Factor",
  "General PC Building",
];

const TechnicianRegistration = ({
  technicianData,
  openFinalReg,
  onBack,
  onSuccess,
}) => {
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [cv, setCV] = useState(null);

  const handleFileChange = (e) => {
    setCV(e.target.files[0]);
  };

  const handleClose = () => {
    if (onBack) onBack();
    if (openFinalReg) openFinalReg(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!specialization || !experience || !cv) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();

    // Ensure all required fields are added
    if (technicianData) {
      formData.append("name", technicianData.name || "");
      formData.append("email", technicianData.email || "");
      formData.append("password", technicianData.password || "");
      formData.append("contact_number", technicianData.contact_number || "");
      formData.append("address", technicianData.address || "");
      formData.append("userType", "Technician");
    }

    formData.append("specialization", specialization);
    formData.append("experience", experience);
    formData.append("cv", cv);

    try {
      const response = await axios.post(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/techniciansignup.php",
        formData,
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        toast.success("Technician registration successful!");
        setTimeout(() => {
          if (openFinalReg) openFinalReg(false);
          if (onSuccess) onSuccess();
        }, 2000);
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Registration failed.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles["tech-essential-registration"]}>
      <div
        className={styles["tech-register-container"]}
        style={{ position: "relative" }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "transparent",
            border: "none",
            fontSize: 28,
            color: "#333",
            cursor: "pointer",
            zIndex: 10,
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Left: Form (centered) */}
        <div className={styles["tech-provider-form"]}>
          <form className={styles["tech-form"]} onSubmit={handleSubmit}>
            <h2>Technician Essentials</h2>
            <div className={styles["tech-input_box"]}>
              <label htmlFor="specialization">Specialization</label>
              <select
                id="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              >
                <option value="">Select Specialization</option>
                {specializationOptions.map((spec, i) => (
                  <option key={i} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles["tech-input_box"]}>
              <label htmlFor="experience">Experience (Years)</label>
              <input
                id="experience"
                type="number"
                placeholder="Experience (Years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className={styles["tech-input_box"]}>
              <label htmlFor="cv">Upload CV</label>
              <input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                autoComplete="off"
              />
              <small className="text-muted">
                Upload your CV (PDF, DOC, DOCX)
              </small>
            </div>
            <div className={styles["tech-button-div"]}>
              <button
                className={styles["tech-button"]}
                type="button"
                onClick={handleClose}
              >
                Back
              </button>
              <button className={styles["tech-button"]} type="submit">
                Register as Technician
              </button>
            </div>
          </form>
        </div>
        {/* Right: Image (centered) */}
        <div className={styles["tech-provider_img"]}>
          <img src={provider_img} alt="" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TechnicianRegistration;
