import React, { useRef, useState } from 'react';
import UploadImage from '../UploadImage';
import { Typography } from '@mui/material';

interface ImageConfigProps {
  passImage: (imageUrl: string) => void;
}

const ImageConfig: React.FC<ImageConfigProps> = ({ passImage}) => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle image upload from device or URL
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    const imageUrl = e.target.value;

    if (files) {
      const imageUrl = URL.createObjectURL(files);
        setUploadedImageUrl(imageUrl); 
        passImage(imageUrl);
        
    } else if (imageUrl) {
      setUploadedImageUrl(imageUrl);
        passImage(imageUrl);
    }
  };

  // Reset the uploaded image
  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadedImageUrl(null);
  };

  return (
    <>
      <Typography variant="body1" my={2} mx={2}>
        Upload Image
      </Typography>
      <UploadImage
        handleImageUpload={handleImageUpload}
        handleReset={handleReset}
        imageUrl={uploadedImageUrl || ''}
        fileInputRef={fileInputRef}
      />
    </>
  );
};

export default ImageConfig;
