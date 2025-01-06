"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { BASE_URL } from "@/config/config";
import Header from "@/components/Header/Header";

const DropZone = styled("div")({
  width: "300px",
  height: "300px",
  border: "2px dashed #ccc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  backgroundColor: "#1c2a38",
  color: "#ccc",
  fontSize: "16px",
  cursor: "pointer",
  position: "relative",
});

export default function EditMovie({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // To hold image preview
  const [currentMovie, setCurrentMovie] = useState<any>(null); // To hold the current movie data
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movies/getOneMovie/${params.id}`
        );
        setCurrentMovie(response.data);
        setTitle(response.data.title);
        setYear(response.data.publishingYear.toString());
        setImagePreview(`http://localhost:5000${response.data.poster}`);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [params.id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Create a preview of the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    if (!title || !year || !image) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("image", image);

    try {
      const response = await axios.patch(
        `${BASE_URL}/movies/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        // alert("Movie updated successfully!");
        router.push("/movielist"); // Redirect to the list of movies or any page you prefer
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      setError("Error Updating movie");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/movielist"); // Redirect to movie list or any page you prefer
  };

  return (
    <>
      <Stack sx={{ margin: { xs: "70px 30px", sm: "50px 20px", md: {} } }}>
        <Header />
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={4}
          sx={{ height: "80vh", color: "#fff" }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Edit Movie
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row", md: "row" }}
            spacing={4}
            alignItems="flex-start"
          >
            {/* Image Drop Zone */}
            <label>
              <DropZone>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <>
                    <i style={{ fontSize: "24px" }}>📥</i>
                    <Typography>Drop an image here</Typography>
                  </>
                )}
              </DropZone>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </label>

            {/* Movie Details Form */}
            <Stack spacing={3} sx={{ width: "300px" }}>
              <TextField
                fullWidth
                label="Title"
                variant="filled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  style: { backgroundColor: "#1c2a38", color: "#fff" },
                }}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#fff", // Placeholder color
                  },
                  "& .MuiFormLabel-root": {
                    color: "#fff", // Label color when inactive
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#90caf9", // Label color when focused (optional)
                  },
                }}
              />
              <TextField
                fullWidth
                label="Publishing Year"
                variant="filled"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                InputProps={{
                  style: { backgroundColor: "#1c2a38", color: "#fff" },
                }}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#fff", // Placeholder color
                  },
                  "& .MuiFormLabel-root": {
                    color: "#fff", // Label color when inactive
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#90caf9", // Label color when focused (optional)
                  },
                }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleCancel}
                  sx={{
                    borderColor: "#fff",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#ffffff20" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{ backgroundColor: "#20b25e", color: "#fff" }}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        open={Boolean(error || success)}
        autoHideDuration={4000}
        onClose={() => {
          setError("");
          setSuccess(false);
        }}
      >
        {error ? (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        ) : success ? (
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Movie Created Successfully
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
}
