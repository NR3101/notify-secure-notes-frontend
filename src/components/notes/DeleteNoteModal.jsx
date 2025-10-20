import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

// Delete confirmation modal - note delete karne se pehle confirmation lega
const DeleteNoteModal = ({ open, setOpen, noteId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Note delete karne ka handler function
  const onNoteDeleteHandler = async () => {
    try {
      setLoading(true);

      // Backend ko DELETE request bhejo
      await api.delete(`/notes/${noteId}`);

      toast.success("Note deleted successfully");
      setOpen(false);

      // Delete hone ke baad notes list page par redirect karo
      navigate("/notes");
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertTriangle className="h-6 w-6" />
            <DialogTitle className="dark:text-gray-100">
              Delete Note
            </DialogTitle>
          </div>
          <DialogDescription className="dark:text-gray-400">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onNoteDeleteHandler}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNoteModal;
