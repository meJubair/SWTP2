import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";

interface ModalDialogProps {
  image: string;
  titleText: string;
  dialogText: string;
  open: boolean;
  onCancel: () => void;
}

const Modal = ({
  image,
  titleText,
  dialogText,
  open,
  onCancel,
}: ModalDialogProps) => {
  return (
    <Dialog open={open}>
      <Box>{image}</Box>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "black" }}>
          {dialogText}
        </DialogContentText>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
