import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
} from "lucide-react";

import "./Hero.css";

let imageCacheBuster = Date.now();

function Hero() {
  const [profileImage, setProfileImage] = useState(
    `/uploads/profile.jpg?t=${imageCacheBuster}`
  );

  const [uploading, setUploading] = useState(false);

  // Load profile image
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await fetch("/api/profile");

      const data = await response.json();

      if (data.success && data.profile && data.profile.image) {
        setProfileImage(
          `${data.profile.image}?t=${imageCacheBuster}`
        );
      }
    } catch (error) {
      console.error("Profile loading error:", error);
    }
  };

  // Change profile image
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    // Show selected image immediately
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);

    const formData = new FormData();

    formData.append("profile", file);

    try {
      setUploading(true);

      const response = await fetch(
        "/api/profile",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Upload response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Upload failed"
        );
      }

      // Load new image from Express
      imageCacheBuster = Date.now();
      setProfileImage(
        `${data.image}?t=${imageCacheBuster}`
      );

      alert("Profile photo changed successfully!");
    } catch (error) {
      console.error("Upload error:", error);

      alert(
        "Upload failed. Make sure the Express server is running on port 5000."
      );

      // Restore previous image
      loadProfile();
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* TOP */}
        <div className="hero-top">
          <span>AI & DATA SCIENCE</span>
          <span>SOFTWARE DEVELOPER</span>
          <span>2028</span>
        </div>

        {/* MAIN */}
        <div className="hero-main">

          {/* NAME */}
          <motion.div
            className="hero-heading"
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="hero-intro">
              HEY, I'M
            </div>

            <h1>
              VINOD
              <br />
              <em>M BHANGI</em>
            </h1>

            <div className="hero-role">
              AI & DATA SCIENCE STUDENT
            </div>
          </motion.div>

          {/* PROFILE */}
          <motion.div
            className="hero-photo-container"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <label
              htmlFor="profile-upload"
              className="hero-photo"
            >

              <img
                src={profileImage}
                alt="Vinod M Bhangi"
              />

              <div className="hero-photo-overlay">
                <Camera size={20} />

                <span>
                  {uploading
                    ? "UPLOADING..."
                    : "CHANGE PHOTO"}
                </span>
              </div>

              <div className="hero-photo-ai">
                AI / DS
              </div>

            </label>

            <input
              id="profile-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <div className="hero-photo-tag">
              <span>01</span>
              <span>PROFILE</span>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM */}
        <div className="hero-bottom">

          <div className="hero-description">
            <span className="hero-number">
              01
            </span>

            <p>
              An Artificial Intelligence and Data
              Science engineering student building
              practical software solutions through
              AI, data and modern web technologies.
            </p>
          </div>

          <div className="hero-actions">

            <a
              href="#projects"
              className="hero-primary-btn"
            >
              <span>View Projects</span>
              <ArrowUpRight size={18} />
            </a>

            <a
              href="#contact"
              className="hero-secondary-btn"
            >
              <span>Contact Me</span>
              <ArrowUpRight size={18} />
            </a>

          </div>
        </div>

        {/* SCROLL */}
        <motion.div
          className="hero-scroll"
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <span>SCROLL</span>
          <ArrowDownRight size={17} />
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;