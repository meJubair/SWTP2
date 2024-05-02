import { useState } from "react";
import Sync from "@mui/icons-material/Sync";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";

interface AutoSaveProps {
    syncing: boolean;
}

const AutoSave = (props: AutoSaveProps) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Implement props that get passed from EditorViewMain.tsx

  const rotate = keyframes({
    from: { transform: "rotate(360deg)" },
    to: { transform: "rotate(0deg)" },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {isSyncing ? (
        <Box sx={{ display: "flex", opacity: 0.5, gap: "0rem" }}>
          <Typography>Changes saved!</Typography>
          <Sync sx={{ animation: `${rotate} 2s` }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", opacity: 0.5, gap: "0rem" }}>
          <Typography>Saving changes...</Typography>
          <Sync sx={{ animation: `${rotate} 2s linear infinite` }} />
        </Box>
      )}
    </Box>
  );
};

export default AutoSave;
