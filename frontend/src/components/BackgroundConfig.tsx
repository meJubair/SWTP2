import React, { useState } from 'react';
import { Paper, Typography, Tab, Tabs } from '@mui/material';
import BackgroundColourSelector from './BackgroundColourSelector';

interface BackGroundConfigProps {
    onConfigChange: (config: BackgroundConfigType) => void;
}

export interface BackgroundConfigType {
    color: string;
    gradient: string;
    image: File | null;
}

const BackGroundConfig: React.FC<BackGroundConfigProps> = ({onConfigChange}) => {
    const [activeOption, setActiveOption] = useState<string>('color');

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
        setActiveOption(newValue);
    };

    // Set background colour of the door content
  const handleColorChange = (color: string) => {
    onConfigChange({
        color,
        gradient: '',
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
            {activeOption === 'color' && (
                <>
                <Typography variant="body1" my={2}>Select Color</Typography>
                 <BackgroundColourSelector onColorChange={handleColorChange} />
                </>
            )}
            {activeOption === 'gradient' && (
                <Typography variant="body1">Configure Gradient</Typography>
            )}
            {activeOption === 'image' && (
                <Typography variant="body1">Upload Background Image</Typography>
            )}
            
        </Paper>
    );
};

export default BackGroundConfig;
