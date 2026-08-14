const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();

const app = express();

const PORT = 5000;

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================================
// DIRECTORIES
// ======================================================

const uploadsPath = path.join(__dirname, "uploads");

const certificatesPath = path.join(
  uploadsPath,
  "certificates"
);

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, {
    recursive: true,
  });
}

if (!fs.existsSync(certificatesPath)) {
  fs.mkdirSync(certificatesPath, {
    recursive: true,
  });
}

// ======================================================
// STATIC FILES
// ======================================================

app.use(
  "/uploads",
  express.static(uploadsPath)
);

// ======================================================
// DATABASE
// ======================================================

const databasePath = path.join(
  __dirname,
  "portfolio.db"
);

const db = new sqlite3.Database(
  databasePath,
  (error) => {
    if (error) {
      console.error(
        "Database connection error:",
        error
      );
    } else {
      console.log(
        "SQLite database connected."
      );
    }
  }
);

// ======================================================
// CREATE TABLES
// ======================================================

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT,
      title TEXT,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      organization TEXT,
      date TEXT,
      description TEXT,
      image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create default profile only once
  db.get(
    `SELECT COUNT(*) AS count FROM profile`,
    (error, row) => {
      if (error) {
        console.error(error);
        return;
      }

      if (row.count === 0) {
        db.run(
          `
          INSERT INTO profile
          (id, name, image, title, description)
          VALUES (?, ?, ?, ?, ?)
          `,
          [
            1,
            "Vinod M Bhangi",
            "/uploads/profile.jpg",
            "AI & Data Science Student | Software Developer",
            "Artificial Intelligence and Data Science engineering student building practical software solutions through AI, data and modern web technologies.",
          ]
        );
      }
    }
  );
});

// ======================================================
// MULTER - PROFILE
// ======================================================

const profileStorage =
  multer.diskStorage({
    destination: function (
      req,
      file,
      cb
    ) {
      cb(null, uploadsPath);
    },

    filename: function (
      req,
      file,
      cb
    ) {
      const extension =
        path.extname(
          file.originalname
        );

      cb(
        null,
        `profile-${Date.now()}${extension}`
      );
    },
  });

const profileUpload = multer({
  storage: profileStorage,

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },

  fileFilter: function (
    req,
    file,
    cb
  ) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, PNG and WEBP images are allowed."
        )
      );
    }
  },
});

// ======================================================
// GET PROFILE
// ======================================================

app.get(
  "/api/profile",
  (req, res) => {
    db.get(
      `SELECT * FROM profile WHERE id = 1`,
      (error, profile) => {
        if (error) {
          console.error(error);

          return res.status(500).json({
            success: false,
            message:
              "Unable to get profile.",
          });
        }

        res.json({
          success: true,
          profile: profile,
        });
      }
    );
  }
);

// ======================================================
// UPLOAD / CHANGE PROFILE
// ======================================================

app.post(
  "/api/profile",
  profileUpload.single("profile"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select an image.",
      });
    }

    const newImage =
      `/uploads/${req.file.filename}`;

    // Get old image
    db.get(
      `SELECT image FROM profile WHERE id = 1`,
      (error, oldProfile) => {
        if (error) {
          console.error(error);

          return res.status(500).json({
            success: false,
            message:
              "Unable to update profile.",
          });
        }

        // Update database
        db.run(
          `
          UPDATE profile
          SET image = ?
          WHERE id = 1
          `,
          [newImage],
          function (updateError) {
            if (updateError) {
              console.error(
                updateError
              );

              return res.status(500).json({
                success: false,
                message:
                  "Unable to save profile.",
              });
            }

            // Delete old profile image
            if (
              oldProfile &&
              oldProfile.image
            ) {
              const oldFile =
                path.join(
                  __dirname,
                  oldProfile.image
                );

              if (
                fs.existsSync(
                  oldFile
                ) &&
                !oldProfile.image.endsWith(
                  "profile.jpg"
                )
              ) {
                try {
                  fs.unlinkSync(
                    oldFile
                  );
                } catch (err) {
                  console.log(
                    "Could not delete old image."
                  );
                }
              }
            }

            res.json({
              success: true,
              message:
                "Profile updated successfully.",
              image: newImage,
            });
          }
        );
      }
    );
  }
);

// ======================================================
// MULTER - CERTIFICATES
// ======================================================

const certificateStorage =
  multer.diskStorage({
    destination: function (
      req,
      file,
      cb
    ) {
      cb(
        null,
        certificatesPath
      );
    },

    filename: function (
      req,
      file,
      cb
    ) {
      const extension =
        path.extname(
          file.originalname
        );

      const filename =
        `certificate-${Date.now()}${extension}`;

      cb(
        null,
        filename
      );
    },
  });

const certificateUpload =
  multer({
    storage:
      certificateStorage,

    limits: {
      fileSize:
        10 * 1024 * 1024,
    },

    fileFilter: function (
      req,
      file,
      cb
    ) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (
        allowedTypes.includes(
          file.mimetype
        )
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPG, PNG and WEBP images are allowed."
          )
        );
      }
    },
  });

// ======================================================
// GET CERTIFICATES
// ======================================================

app.get(
  "/api/certificates",
  (req, res) => {
    db.all(
      `
      SELECT *
      FROM certificates
      ORDER BY id DESC
      `,
      [],
      (error, certificates) => {
        if (error) {
          console.error(error);

          return res.status(500).json({
            success: false,
            message:
              "Unable to get certificates.",
          });
        }

        res.json({
          success: true,
          certificates:
            certificates,
        });
      }
    );
  }
);

// ======================================================
// ADD CERTIFICATE
// ======================================================

app.post(
  "/api/certificates",
  certificateUpload.single(
    "certificate"
  ),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a certificate image.",
      });
    }

    const title =
      req.body.title ||
      "Untitled Certificate";

    const organization =
      req.body.organization || "";

    const date =
      req.body.date || "";

    const description =
      req.body.description || "";

    const image =
      `/uploads/certificates/${req.file.filename}`;

    db.run(
      `
      INSERT INTO certificates
      (
        title,
        organization,
        date,
        description,
        image
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        title,
        organization,
        date,
        description,
        image,
      ],
      function (error) {
        if (error) {
          console.error(error);

          return res.status(500).json({
            success: false,
            message:
              "Unable to save certificate.",
          });
        }

        db.get(
          `
          SELECT *
          FROM certificates
          WHERE id = ?
          `,
          [this.lastID],
          (getError, certificate) => {
            if (getError) {
              return res.status(500).json({
                success: false,
                message:
                  "Certificate saved but could not be retrieved.",
              });
            }

            res.status(201).json({
              success: true,
              message:
                "Certificate added successfully.",
              certificate:
                certificate,
            });
          }
        );
      }
    );
  }
);

// ======================================================
// DELETE CERTIFICATE
// ======================================================

app.delete(
  "/api/certificates/:id",
  (req, res) => {
    const id =
      Number(req.params.id);

    db.get(
      `
      SELECT *
      FROM certificates
      WHERE id = ?
      `,
      [id],
      (error, certificate) => {
        if (error) {
          console.error(error);

          return res.status(500).json({
            success: false,
            message:
              "Database error.",
          });
        }

        if (!certificate) {
          return res.status(404).json({
            success: false,
            message:
              "Certificate not found.",
          });
        }

        // Delete image file
        const imagePath =
          path.join(
            __dirname,
            certificate.image
          );

        if (
          fs.existsSync(imagePath)
        ) {
          try {
            fs.unlinkSync(
              imagePath
            );
          } catch (err) {
            console.log(
              "Could not delete certificate image."
            );
          }
        }

        // Delete database record
        db.run(
          `
          DELETE FROM certificates
          WHERE id = ?
          `,
          [id],
          function (deleteError) {
            if (deleteError) {
              console.error(
                deleteError
              );

              return res.status(500).json({
                success: false,
                message:
                  "Unable to delete certificate.",
              });
            }

            res.json({
              success: true,
              message:
                "Certificate deleted successfully.",
            });
          }
        );
      }
    );
  }
);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Portfolio server is running!",
    });
  }
);

// ======================================================
// ERROR HANDLER
// ======================================================

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong.",
    });
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  () => {
    console.log(
      `Portfolio server running at http://localhost:${PORT}`
    );

    console.log(
      `Uploads available at http://localhost:${PORT}/uploads`
    );
  }
);