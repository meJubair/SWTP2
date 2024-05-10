import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface UploadImageProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  imageUrl: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const UploadImage: React.FC<UploadImageProps> = ({
  handleImageUpload,
  handleReset,
  imageUrl,
  fileInputRef,
}) => {
  return (
    <Box>
      <Typography variant="body2" sx={{ marginBottom: "5px" }}>
        Uploading an image from your device or entering an image URL will set
        the background image automatically.
      </Typography>
      <TextField
        type="file"
        onChange={handleImageUpload}
        inputRef={fileInputRef}
        fullWidth
      />
      <TextField
        id="image-url-input"
        type="text"
        placeholder="Enter image URL"
        onChange={handleImageUpload}
        fullWidth
        sx={{ margin: "10px 0" }}
        value={imageUrl}
      />
      <Box sx={{ display: "flex", justifyContent: "center", my: "10px" }}>
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
      </Box>
      <Typography variant="body2">
        <Typography variant="subtitle1" component="span">
          NB:
        </Typography>{" "}
        Ensure you have the right to use and upload the selected image to avoid
        copyright issues.
      </Typography>
    </Box>
  );
};

export default UploadImage;
