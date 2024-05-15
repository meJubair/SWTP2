import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalDialogProps {
  titleText: string;
  dialogText: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalDialog = ({
  titleText,
  dialogText,
  open,
  onConfirm,
  onCancel,
}: ModalDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "black" }}>
          {dialogText}
        </DialogContentText>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            No
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
