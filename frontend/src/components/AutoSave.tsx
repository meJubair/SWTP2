import Sync from "@mui/icons-material/Sync";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";

interface AutoSaveProps {
  sync: boolean;
}

const AutoSave = (props: AutoSaveProps) => {
  // Implement props that get passed from EditorViewMain.tsx

  const rotate = keyframes({
    from: { transform: "rotate(360deg)" },
    to: { transform: "rotate(0deg)" },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Box sx={{ display: "flex", opacity: 0.5, gap: "0.5rem" }}>
        {props.sync ? (
          <>
            <Typography>Changes saved! </Typography>
            <CloudDoneIcon />
          </>
        ) : (
          <>
            <Typography>Saving changes...</Typography>
            <Sync sx={{ animation: `${rotate} 2s linear infinite` }} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default AutoSave;
