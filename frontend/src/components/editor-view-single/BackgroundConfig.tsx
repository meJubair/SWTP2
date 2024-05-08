import React, { useRef, useState } from "react";
import { Paper, Typography, Tab, Tabs, TextField } from "@mui/material";
import UploadImage from "../UploadImage";
import GradientSelector from "../GradientSelector";

interface BackGroundConfigProps {
  onConfigChange: (config: BackgroundConfigType) => void;
}

export interface BackgroundConfigType {
  color: string;
  gradient: string;
  image: File | null;
}

const BackGroundConfig: React.FC<BackGroundConfigProps> = ({
  onConfigChange,
}) => {
  const [activeOption, setActiveOption] = useState<string>("color");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setActiveOption(newValue);
  };

  // Set background colour of the door content
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({
      color: e.target.value,
      gradient: "",
      image: null,
    });
  };

  // Handle image upload from device or URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    const imageUrl = files
      ? URL.createObjectURL(files)
      : e.target.value || null;
    setUploadedImageUrl(imageUrl);
    onConfigChange({
      color: "",
      gradient: "",
      image: imageUrl as File | null,
    });
  };

  // Reset the uploaded image
  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadedImageUrl(null);
  };

  // Callback function to handle changes to the gradient value
  const handleGradientChange = (gradient: string) => {
    onConfigChange({
      color: "",
      gradient,
      image: null,
    });
  };
  return (
    <Paper>
      {/* Configuration Tabs */}
      <Tabs value={activeOption} onChange={handleTabChange}>
        <Tab label="Color" value="color" />
        <Tab label="Gradient" value="gradient" />
        <Tab label="Image" value="image" />
      </Tabs>

      {/* Render active configuration option */}
      {activeOption === "color" && (
        <>
          <Typography variant="body1" my={2} mx={2}>
            Select Color
          </Typography>
          <TextField
            label="Background colour"
            type="color"
            onChange={handleColorChange}
            fullWidth
          />
        </>
      )}
      {activeOption === "gradient" && (
        <GradientSelector onChange={handleGradientChange} />
      )}
      {activeOption === "image" && (
        <>
          <Typography variant="body1" my={2} mx={2}>
            Upload Image
          </Typography>
          <UploadImage
            handleImageUpload={handleImageUpload}
            handleReset={handleReset}
            imageUrl={uploadedImageUrl || ""}
            fileInputRef={fileInputRef}
          />
        </>
      )}
    </Paper>
  );
};

export default BackGroundConfig;
