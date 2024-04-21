import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, Grid, Box, IconButton, Tooltip } from '@mui/material';
import { TextFields, FormatPaint, Image, Videocam, Code } from '@mui/icons-material'; // Import Material-UI icons
import TextConfig, { TextConfigType } from '../components/TextConfig';
import BackGroundConfig, {BackgroundConfigType} from '../components/BackgroundConfig';

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
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false);
  const [hoveredType, setHoveredType] = useState<ContentType | null>(null); 

  const validInputLabels: Array<keyof TextConfigType> = ['title', 'subtitle', 'description'];
  const [currentInputLabel, setCurrentInputLabel] = useState<keyof TextConfigType | null>(null);

  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundConfigType>({
    color: '#ffffff',
    gradient: '',
    image: null,
  });

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
    setMenuExpanded(false);
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

  useEffect(() => {
    setActiveType(ContentType.Text);;
  }, []);

  return (
    <div>
      <Grid container spacing={2} style={{ height: '100vh' }}>
        {/* First Column: Side Menu */}
        <Grid item xs={menuExpanded ? 3 : 2}>
          <Paper
            style={{
              paddingTop: '20px',
              height: '100%',
              backgroundColor: '#0091AD',
              overflow: 'hidden',
            }}
            onMouseEnter={() => setMenuExpanded(true)}
            onMouseLeave={() => setMenuExpanded(false)}
          >
            <Grid container direction="column" alignItems="center">
              {Object.values(ContentType).map((type) => (
                <Grid item key={type}>
                  {/* Render either text or icon based on hover state */}
                  {menuExpanded || hoveredType === type ? (
                    <Button
                      onClick={() => handleTypeSelection(type)}
                      fullWidth
                      style={{
                        color: '#ffffff',
                        backgroundColor: activeType === type ? '#0B2027' : 'transparent',
                      }}
                      onMouseEnter={() => setHoveredType(type)}
                      onMouseLeave={() => setHoveredType(null)}
                    >
                      {type}
                    </Button>
                  ) : (
                    <Tooltip title={type.charAt(0).toUpperCase() + type.slice(1)} placement="right">
                      <IconButton onClick={() => handleTypeSelection(type)} style={{ 
                        color: '#ffffff',
                        backgroundColor: activeType === type ? '#0B2027' : 'transparent' }}
                        >
                        {type === ContentType.Text ? (
                          <TextFields />
                        ) : type === ContentType.Background ? (
                          <FormatPaint />
                        ) : type === ContentType.Image ? (
                          <Image />
                        ) : type === ContentType.Video ? (
                          <Videocam />
                        ) : (
                          <Code />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Second Column: Content Editor */}
        {activeType && (
          <Grid item xs={menuExpanded ? 3 : 3}>
          <Paper style={{ padding: '20px', height: '100%', backgroundColor: '#eeeeee' }}>
            <Typography variant="h6" gutterBottom>
              {activeType.charAt(0).toUpperCase() + activeType.slice(1)} Content
            </Typography>
            {activeType === ContentType.Text ? (
                <TextConfig values={textConfig} onChange={handleTextConfigChange} />
              ) : activeType === ContentType.Background ? (
                <BackGroundConfig onConfigChange={setBackgroundConfig} />
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
        <Grid item xs={menuExpanded ? 6 : 7}>
          <Paper style={{ padding: '20px', height: '100%', backgroundColor: '#eeeeee' }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Box component="div" bgcolor={backgroundConfig.color} p={2}>
                  {validInputLabels.map((label) => (
                    <Typography key={label} variant="body1" style={generateTextStyle(label)}>
                      {textConfig[label]}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DoorContent;
