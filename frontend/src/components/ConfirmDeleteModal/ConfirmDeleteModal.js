import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteBookMutation } from "../../features/bookApiSlice";
import "./ConfirmDeleteModal.scss";

function ConfirmDeleteModal({ bookId, onDelete }) {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const [deleteBook] = useDeleteBookMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await deleteBook(bookId);
      enqueueSnackbar("Book deleted!", { variant: "success" });

      navigate("/books");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error deleting the book!", { variant: "error" });
    }
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
