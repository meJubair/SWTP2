import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, IconButton, Tooltip, Drawer, Box, TextField } from '@mui/material';
import { TextFields, FormatPaint, Image, Videocam, Code } from '@mui/icons-material';
import TextConfig, { TextConfigType } from '../components/TextConfig';

enum ContentType {
  Text = 'text',
  Background = 'background',
  Image = 'image',
  Video = 'video',
  Embed = 'embed',
}

interface DoorContentProps {}

const DoorContent: React.FC<DoorContentProps> = () => {
  const defaultTextConfig: TextConfigType = {
    title: 'Waiting starts',
    subtitle: 'Almost there...',
    description: "I can't wait our vacation to start. Only 3 more days to go!",
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  };

  const [activeType, setActiveType] = useState<ContentType | null>(null);
  const [modalContent, setModalContent] = useState<{ [key: string]: string }>({});
  const [textConfig, setTextConfig] = useState<TextConfigType>(defaultTextConfig);
  const [hoveredType, setHoveredType] = useState<ContentType | null>(null);
  const [slideOut, setSlideOut] = useState<boolean>(false); 

  const validInputLabels: Array<keyof TextConfigType> = ['title', 'subtitle', 'description'];
  const [currentInputLabel, setCurrentInputLabel] = useState<keyof TextConfigType | null>(null);

  const handleTextConfigChange = (field: keyof TextConfigType, value: any) => {
    setTextConfig((prevConfig: TextConfigType) => ({
      ...prevConfig,
      [field]: value,
    }));
    if (validInputLabels.includes(field)) {
      setCurrentInputLabel(field);
    }
  };

  const handleContentChange = (field: keyof typeof modalContent, value: string) => {
    setModalContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  const handleTypeSelection = (type: ContentType) => {
    setActiveType(type);
    setSlideOut(false);
  };

  const generateTextStyle = (label: keyof TextConfigType): React.CSSProperties => {
    if (currentInputLabel === label) {
      return {
        fontWeight: textConfig.fontWeight,
        fontSize: textConfig.fontSize,
        fontFamily: textConfig.fontFamily,
        backgroundColor: textConfig.backgroundColor,
        color: textConfig.textColor,
      };
    }
    return {};
  };

  const iconMapping = {
    [ContentType.Text]: <TextFields />,
    [ContentType.Background]: <FormatPaint />,
    [ContentType.Image]: <Image />,
    [ContentType.Video]: <Videocam />,
    [ContentType.Embed]: <Code />,
    default: <TextFields />,
  };

  useEffect(() => {
    setActiveType(ContentType.Text);
  }, []);

  return (
    <div>
      <Grid container spacing={2} style={{ height: '100vh'}}>
        {/* First Column: Side Menu */}
        <Drawer
          open={Boolean(hoveredType)}
          onClose={() => setHoveredType(null)}
          variant="permanent"
          PaperProps={{ style: { width: 'fit-content', backgroundColor: '#0091AD', marginTop: '64px', paddingTop: '20px'} }}
        >
          <Grid container direction="column" alignItems="center">
            {Object.values(ContentType).map((type) => (
              <Grid item key={type}>
                <Tooltip title={type.charAt(0).toUpperCase() + type.slice(1)} placement='right'>
                <IconButton
                  onClick={() => handleTypeSelection(type)}
                  style={{
                    color: '#ffffff',
                    backgroundColor: activeType === type ? '#0B2027' : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredType(type)}
                  onMouseLeave={() => setHoveredType(null)}
                >
                  {iconMapping[type] || iconMapping.default}
                </IconButton>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Drawer>

        {/* Second Column: Content Editor */}
        {activeType && !slideOut && (
          <Grid item xs={3} style={{ paddingLeft: '50px' }}>
            <Paper style={{ padding: '20px', height: '100%', backgroundColor: '#eeeeee' }}>
              <Typography variant="h6" gutterBottom>
                {activeType.charAt(0).toUpperCase() + activeType.slice(1)} Content
              </Typography>
              {activeType === ContentType.Text ? (
                <TextConfig values={textConfig} onChange={handleTextConfigChange} />
              ) : (
                <TextField
                  label={activeType.charAt(0).toUpperCase() + activeType.slice(1)}
                  fullWidth
                  value={modalContent[activeType] || ''}
                  onChange={(e) => handleContentChange(activeType, e.target.value)}
                  multiline
                  minRows={4}
                />
              )}
            </Paper>
          </Grid>
        )}
        
        {/* Third Column for End Users */}
          <Grid item xs={slideOut ? 12 : 9}
            onClick={() => {
              setSlideOut(prevSlideOut => !prevSlideOut);
            }}>
          <Paper style={{ padding: '20px', backgroundColor: '#eeeeee', height: '100%'}}>
              <Box bgcolor="#ffffff" p={5}>
                {validInputLabels.map((label) => (
                  <Typography key={label} variant="body1" style={generateTextStyle(label)}>
                    {textConfig[label]}
                  </Typography>
                ))}
              </Box>
          </Paper>
      </Grid>

      </Grid>
    </div>
  );
};

export default DoorContent;