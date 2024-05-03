import React, { useState } from 'react';
import { Typography, Grid, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

interface GradientSelectorProps {
    onChange: (gradient: string) => void;
}

const GradientSelector: React.FC<GradientSelectorProps> = ({ onChange }) => {
    const [startColor, setStartColor] = useState<string>('#FF0000');
    const [endColor, setEndColor] = useState<string>('#00FF00'); 
    const [direction, setDirection] = useState<string>('to bottom');

    const handleDirectionChange = (event: React.ChangeEvent<{ value: string }>) => {
        setDirection(event.target.value);
    };

    const generateGradient = (): string => {
        return `linear-gradient(${direction}, ${startColor}, ${endColor})`; // Construct gradient string
    };

    return (
        <>
            <Typography variant="body1" my={2} mx={2}>
                Gradient Selector
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="start-color-label">Start Color</InputLabel>
                        <Select
                            labelId="start-color-label"
                            value={startColor}
                            onChange={(event) => setStartColor(event.target.value as string)}
                            fullWidth
                        >
                            <MenuItem value="#FF0000">Red</MenuItem>
                            <MenuItem value="#00FF00">Green</MenuItem>
                            <MenuItem value="#0000FF">Blue</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="end-color-label">End Color</InputLabel>
                        <Select
                            labelId="end-color-label"
                            value={endColor}
                            onChange={(event) => setEndColor(event.target.value as string)}
                            fullWidth
                        >
                            <MenuItem value="#FF0000">Red</MenuItem>
                            <MenuItem value="#00FF00">Green</MenuItem>
                            <MenuItem value="#0000FF">Blue</MenuItem>
                            {/* Add more color options as needed */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="direction-label">Direction</InputLabel>
                        <Select
                            labelId="direction-label"
                            value={direction}
                            onChange={(event) => handleDirectionChange(event as React.ChangeEvent<{ value: string }>)} // Fix the event type
                            fullWidth
                        >
                            <MenuItem value="to top">To Top</MenuItem>
                            <MenuItem value="to right">To Right</MenuItem>
                            <MenuItem value="to bottom">To Bottom</MenuItem>
                            <MenuItem value="to left">To Left</MenuItem>
                            <MenuItem value="to top left">To Top Left</MenuItem>
                            <MenuItem value="to top right">To Top Right</MenuItem>
                            <MenuItem value="to bottom right">To Bottom Right</MenuItem>
                            <MenuItem value="to bottom left">To Bottom Left</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Typography variant="caption">Preview: {generateGradient()}</Typography>
            <Button variant="contained" onClick={() => onChange(generateGradient())}>Apply</Button>
        </>
    );
};

export default GradientSelector;
