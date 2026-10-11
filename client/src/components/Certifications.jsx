import { useEffect, useState } from "react";

import {
  Plus,
  X,
  Trash2,
  ExternalLink,
  Award,
  Upload,
} from "lucide-react";

import "./Certifications.css";

function Certifications() {
  // ========================================
  // DEFAULT CERTIFICATES FALLBACK (WORKS OFFLINE / LIVE DEPLOYMENT)
  // ========================================

  const DEFAULT_CERTIFICATES = [
    {
      id: 1,
      title: "GenAI Powered Data Analytics",
      organization: "TATA",
      date: "August 1st, 2026",
      description: "Completed the Tata × Forage GenAI Powered Data Analytics Job Simulation, gaining practical experience in data analysis, AI-based risk prediction, business reporting, and data-driven decision-making.",
      image: "/uploads/certificates/certificate-1786630075531.jpeg",
    },
    {
      id: 2,
      title: "Artificial intelligence Profesional ",
      organization: "UNIFIED MENTOR",
      date: "August 1st, 2026",
      description: "Gained foundational knowledge of Artificial Intelligence and Machine Learning concepts. Learned practical approaches to AI-based problem solving and real-world applications. Developed skills in data analysis, logical thinking, and AI technologies.",
      image: "/uploads/certificates/certificate-1786630369413.jpeg",
    },
    {
      id: 4,
      title: "Python 3",
      organization: "EDUCATIVE CERTIFIED ",
      date: "16-05-2026",
      description: "Gained foundational knowledge of Python programming, including variables, data types, control flow, loops, functions, and problem-solving through hands-on coding exercises.",
      image: "/uploads/certificates/certificate-1786630735599.jpeg",
    },
    {
      id: 5,
      title: "Data Analytics Job Simulation",
      organization: "Deloitte",
      date: "August 30th, 2026",
      description: "Completed Deloitte’s Data Analytics Job Simulation, gaining practical experience in data analysis and forensic technology while solving real-world business-related tasks.",
      image: "/uploads/certificates/certificate-1788154928745.jpeg",
    },
    {
      id: 6,
      title: "Python with Data Analytics ",
      organization: "iFutureTech",
      date: "05-12-2025",
      description: "Learned the fundamentals of Python for Data Analysis, including using Python to work with datasets, clean and organize data, perform basic analysis, and extract meaningful insights, applying Python programming concepts to real-world data analysis tasks.",
      image: "/uploads/certificates/certificate-1788757666363.jpeg",
    },
  ];

  // ========================================
  // STATES
  // ========================================

  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);

  const [showForm, setShowForm] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    organization: "",
    date: "",
    description: "",
    file: null,
  });

  // ========================================
  // LOAD CERTIFICATES
  // ========================================

  const loadCertificates = async () => {
    try {
      const response = await fetch("/api/certificates");
      if (!response.ok) return;

      const data = await response.json();

      if (data.success && Array.isArray(data.certificates) && data.certificates.length > 0) {
        setCertificates(data.certificates);
      }
    } catch {
      // Keep DEFAULT_CERTIFICATES when API server is not running
    }
  };

  // ========================================
  // LOAD ON PAGE START
  // ========================================

  useEffect(() => {
    loadCertificates();
  }, []);

  // ========================================
  // FORM INPUT
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // SELECT CERTIFICATE IMAGE
  // ========================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please select a JPG, PNG or WEBP image."
      );

      event.target.value = "";

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(
        "Certificate image must be smaller than 10MB."
      );

      event.target.value = "";

      return;
    }

    setForm((previous) => ({
      ...previous,
      file: file,
    }));
  };

  // ========================================
  // ADD CERTIFICATE
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.file) {
      alert(
        "Please select a certificate image."
      );

      return;
    }

    if (!form.title.trim()) {
      alert(
        "Please enter the certificate title."
      );

      return;
    }

    if (!form.organization.trim()) {
      alert(
        "Please enter the issuing organization."
      );

      return;
    }

    const formData = new FormData();

    formData.append(
      "certificate",
      form.file
    );

    formData.append(
      "title",
      form.title
    );

    formData.append(
      "organization",
      form.organization
    );

    formData.append(
      "date",
      form.date
    );

    formData.append(
      "description",
      form.description
    );

    try {
      setUploading(true);

      const response = await fetch(
        "/api/certificates",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Certificate upload failed."
        );
      }

      alert(
        "Certificate added successfully!"
      );

      // Reset form
      setForm({
        title: "",
        organization: "",
        date: "",
        description: "",
        file: null,
      });

      setShowForm(false);

      // Reload certificates
      await loadCertificates();

      // Keep list collapsed after adding
      setShowAll(false);

    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Unable to upload certificate."
      );
    } finally {
      setUploading(false);
    }
  };

  // ========================================
  // DELETE CERTIFICATE
  // ========================================

  const deleteCertificate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/certificates/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to delete certificate."
        );
      }

      setCertificates((previous) =>
        previous.filter(
          (certificate) =>
            certificate.id !== id
        )
      );

      // Close viewer if deleted
      if (
        selectedCertificate?.id === id
      ) {
        setSelectedCertificate(null);
      }

    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Unable to delete certificate."
      );
    }
  };

  // ========================================
  // CLOSE FORM
  // ========================================

  const closeForm = () => {
    if (uploading) {
      return;
    }

    setShowForm(false);

    setForm({
      title: "",
      organization: "",
      date: "",
      description: "",
      file: null,
    });
  };

  // ========================================
  // DISPLAY ONLY 8
  // ========================================

  const displayedCertificates = showAll
    ? certificates
    : certificates.slice(0, 8);

  return (
    <section
      className="certifications"
      id="certifications"
    >
      <div className="certifications-container">

        {/* ==================================
            HEADER
        =================================== */}

        <div className="certifications-header">

          <div className="certifications-title">

            <span className="section-number">
              06
            </span>

            <h2>
              CERTIFICATIONS
            </h2>

          </div>

          <button
            className="add-certificate-btn"
            onClick={() =>
              setShowForm(true)
            }
          >
            <Plus size={18} />

            <span>
              Add Certificate
            </span>
          </button>

        </div>

        {/* ==================================
            EMPTY STATE
        =================================== */}

        {certificates.length === 0 ? (
          <div className="empty-certificates">

            <div className="empty-icon">
              <Award size={45} />
            </div>

            <h3>
              No Certificates Yet
            </h3>

            <p>
              Add your certificates and
              achievements to your portfolio.
            </p>

            <button
              onClick={() =>
                setShowForm(true)
              }
            >
              <Plus size={18} />

              Add Your First Certificate
            </button>

          </div>
        ) : (

          <>
            {/* ==================================
                CERTIFICATE GRID
            =================================== */}

            <div className="certificate-grid">

              {displayedCertificates.map(
                (certificate) => (

                  <article
                    className="certificate-card"
                    key={certificate.id}
                  >

                    {/* IMAGE */}

                    <div
                      className="certificate-image"
                      onClick={() =>
                        setSelectedCertificate(
                          certificate
                        )
                      }
                    >

                      <img
                        src={
                          certificate.image
                        }
                        alt={
                          certificate.title
                        }
                      />

                      <div className="view-overlay">

                        <ExternalLink
                          size={20}
                        />

                        <span>
                          View Certificate
                        </span>

                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="certificate-content">

                      <div className="certificate-icon">
                        <Award size={20} />
                      </div>

                      <h3>
                        {certificate.title}
                      </h3>

                      <p className="organization">
                        {
                          certificate.organization
                        }
                      </p>

                      {certificate.date && (
                        <span className="certificate-date">
                          {
                            certificate.date
                          }
                        </span>
                      )}

                      {certificate.description && (
                        <p className="certificate-description">
                          {
                            certificate.description
                          }
                        </p>
                      )}

                      <button
                        className="delete-certificate"
                        onClick={() =>
                          deleteCertificate(
                            certificate.id
                          )
                        }
                      >
                        <Trash2
                          size={16}
                        />

                        <span>
                          Delete
                        </span>
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>

            {/* ==================================
                VIEW ALL / SHOW LESS
            =================================== */}

            {certificates.length > 8 && (
              <div className="view-all-certificates">

                <div className="certificate-count">
                  Showing{" "}
                  {displayedCertificates.length}{" "}
                  of{" "}
                  {certificates.length}{" "}
                  certificates
                </div>

                <button
                  onClick={() =>
                    setShowAll(
                      (previous) =>
                        !previous
                    )
                  }
                >

                  {showAll ? (
                    <>
                      Show Less
                      <X size={17} />
                    </>
                  ) : (
                    <>
                      View All Certificates
                      <ExternalLink
                        size={17}
                      />
                    </>
                  )}

                </button>

              </div>
            )}

          </>
        )}

      </div>

      {/* ====================================
          ADD CERTIFICATE MODAL
      ===================================== */}

      {showForm && (
        <div className="certificate-modal">

          <div className="certificate-form">

            {/* CLOSE */}

            <button
              className="close-modal"
              onClick={closeForm}
              type="button"
            >
              <X size={22} />
            </button>

            {/* FORM HEADER */}

            <div className="form-header">

              <div className="form-icon">
                <Award size={25} />
              </div>

              <h2>
                Add Certificate
              </h2>

              <p>
                Add your certification
                details and certificate image.
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
            >

              {/* TITLE */}

              <div className="form-group">

                <label>
                  Certificate Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="e.g. React Developer Certificate"
                  value={form.title}
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* ORGANIZATION */}

              <div className="form-group">

                <label>
                  Issuing Organization
                </label>

                <input
                  type="text"
                  name="organization"
                  placeholder="e.g. Google, IBM, Coursera"
                  value={
                    form.organization
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* DATE */}

              <div className="form-group">

                <label>
                  Completion Date
                </label>

                <input
                  type="text"
                  name="date"
                  placeholder="e.g. August 2026"
                  value={form.date}
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Briefly describe what you learned..."
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                />

              </div>

              {/* FILE */}

              <div className="form-group">

                <label>
                  Certificate Image
                </label>

                <label className="file-upload">

                  <Upload size={28} />

                  <strong>
                    {form.file
                      ? form.file.name
                      : "Choose Certificate"}
                  </strong>

                  <span>
                    JPG, PNG or WEBP
                    · Maximum 10MB
                  </span>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={
                      handleFileChange
                    }
                    hidden
                  />

                </label>

              </div>

              {/* SUBMIT */}

              <button
                className="submit-certificate"
                type="submit"
                disabled={uploading}
              >

                {uploading ? (
                  <>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={18} />

                    Add Certificate
                  </>
                )}

              </button>

            </form>

          </div>

        </div>
      )}

      {/* ====================================
          CERTIFICATE VIEWER
      ===================================== */}

      {selectedCertificate && (
        <div
          className="certificate-viewer"
          onClick={() =>
            setSelectedCertificate(
              null
            )
          }
        >

          <button
            className="viewer-close"
            onClick={() =>
              setSelectedCertificate(
                null
              )
            }
          >
            <X size={25} />
          </button>

          <div
            className="viewer-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={
                selectedCertificate.image
              }
              alt={
                selectedCertificate.title
              }
            />

            <div className="viewer-info">

              <h3>
                {
                  selectedCertificate.title
                }
              </h3>

              <p>
                {
                  selectedCertificate.organization
                }
              </p>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default Certifications;