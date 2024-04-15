import React, { useState } from "react";
import { SketchPicker } from "react-color";

const BackgroundColourSelector: React.FC<{
  onColorChange: (color: string) => void;
}> = ({ onColorChange }) => {
  const [bgColour, setBgColour] = useState<string>("#ffffff");

  const handleChange = (color: any) => {
    const newColour = color.hex;
    setBgColour(newColour);
    onColorChange(newColour); // Pass the new colour to the EditorViewMain component
  };

  return <SketchPicker color={bgColour} onChange={handleChange} />;
};

export default BackgroundColourSelector;
