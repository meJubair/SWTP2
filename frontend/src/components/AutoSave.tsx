import { useState } from "react";
import Sync from "@mui/icons-material/Sync";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AutoSave = () => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  return (
    <Box sx={{display:"flex", justifyContent:"flex-end"}}>
      {isSyncing ? (
        <Box sx={{ display: "flex", opacity: 0.5, gap: "0rem" }}>
          <Typography>Changes saved</Typography>
          <Sync />
        </Box>
      ) : (
        <Box sx={{ display: "flex", opacity: 0.5, gap: "0rem" }}>
          <Typography>Changes saved</Typography>
          <Sync />
        </Box>
      )}
    </Box>
  );
};


export default AutoSave;
