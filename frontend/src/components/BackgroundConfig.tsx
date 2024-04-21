import React, { useState } from 'react';
import { Paper, Typography, Tab, Tabs } from '@mui/material';

interface BackGroundConfigProps {
    onConfigChange: (config: BackgroundConfigType) => void;
}

export interface BackgroundConfigType {
    color: string;
    gradient: string;
    image: File | null;
}

const BackGroundConfig: React.FC<BackGroundConfigProps> = () => {
    const [activeOption, setActiveOption] = useState<string>('color');

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
        setActiveOption(newValue);
    
    };

    return (
        <Paper style={{ padding: '20px' }}>
            {/* Configuration Tabs */}
            <Tabs value={activeOption} onChange={handleTabChange} centered>
                <Tab label="Color" value="color" />
                <Tab label="Gradient" value="gradient" />
                <Tab label="Image" value="image" />
            </Tabs>

            {/* Render active configuration option */}
            {activeOption === 'color' && (
                <Typography variant="body1">Configure Background Color</Typography>
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
