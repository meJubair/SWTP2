import React from "react";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export interface TextConfigType {
  title: string;
  subtitle: string;
  description: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  backgroundColor: string;
  textColor: string;
}

interface TextConfigProps {
  onChange: (field: keyof TextConfigType, value: string | number) => void;
  values: TextConfigType;
}

const TextConfig: React.FC<TextConfigProps> = ({ onChange, values }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Title"
          fullWidth
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Subtitle"
          fullWidth
          value={values.subtitle}
          onChange={(e) => onChange("subtitle", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          fullWidth
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          multiline
          minRows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Font Size</Typography>
        <Slider
          value={values.fontSize}
          // onChange={(e, value) => onChange('fontSize', value as number)}
          min={8}
          max={72}
          step={1}
          marks
          valueLabelDisplay="auto"
          aria-labelledby="font-size-slider"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Font Weight</Typography>
        <Select
          value={values.fontWeight}
          onChange={(e) => onChange("fontWeight", e.target.value as string)}
          fullWidth
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="bold">Bold</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Font Family</Typography>
        <Select
          value={values.fontFamily}
          onChange={(e) => onChange("fontFamily", e.target.value as string)}
          fullWidth
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Background Color"
          type="color"
          value={values.backgroundColor}
          onChange={(e) => onChange("backgroundColor", e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Text Color"
          type="color"
          value={values.textColor}
          onChange={(e) => onChange("textColor", e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TextConfig;
