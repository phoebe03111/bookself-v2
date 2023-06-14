import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "./ConfirmDeleteModal.scss";

function ConfirmDeleteModal({ bookId, onDelete }) {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleDelete = () => {
    // dispatch(deleteBook(bookId));
    navigate("/books");
  };

  const handleClose = () => {
    setOpen(false);
    onDelete(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDeleteModal;
