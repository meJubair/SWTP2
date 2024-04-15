import React, { useState } from 'react';
import { Paper, Typography, Button, TextField, Grid } from '@mui/material';
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
  const [activeType, setActiveType] = useState<ContentType | null>(null);
  const [modalContent, setModalContent] = useState<{ [key: string]: string }>({});
  const [doorData, setDoorData] = useState<
    { type: ContentType | null; content: { [key: string]: string } }[]
  >([]);
  const [textConfig, setTextConfig] = useState<TextConfigType>({
    title: '',
    subtitle: '',
    description: '',
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  });

  const [currentInputLabel, setCurrentInputLabel] = useState<keyof TextConfigType | null>(null);

  const validInputLabels: Array<keyof TextConfigType> = ['title', 'subtitle', 'description'];

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
  
    setDoorData((prevDoorData) =>
      prevDoorData.map((data) => {
        if (data.type === activeType) {
          return {
            type: data.type,
            content: { ...data.content, [field]: value },
          };
        }
        return data;
      })
    );
  };
  
  const handleTypeSelection = (type: ContentType) => {
    setActiveType(type);
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

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {Object.values(ContentType).map(type => (
                <Button key={type} onClick={() => handleTypeSelection(type)}>
                  {type}
                </Button>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              {activeType && `${activeType.charAt(0).toUpperCase()}${activeType.slice(1)} Content`}
            </Typography>
            {activeType && (
              <>
                {activeType === ContentType.Text ? (
                  <TextConfig values={textConfig} onChange={handleTextConfigChange} />
                ) : (
                  <TextField
                    label={activeType === ContentType.Background ? 'Background' : 'Content'}
                    fullWidth
                    value={modalContent[activeType] || ''}
                    onChange={(e) => handleContentChange(activeType, e.target.value)}
                    multiline
                    minRows={4}
                  />
                )}
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          {activeType === ContentType.Text && (
            <div>
              {validInputLabels.map(label => (
                <Typography key={label} variant="body1" style={generateTextStyle(label)}>
                  {textConfig[label]}
                </Typography>
              ))}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DoorContent;
