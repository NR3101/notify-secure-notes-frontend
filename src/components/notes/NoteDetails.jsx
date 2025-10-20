import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save, X, Trash2 } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import DeleteNoteModal from "./DeleteNoteModal";
import api from "@/services/api";

const NoteDetails = () => {
  const { id } = useParams(); // URL se note ID lenge
  const navigate = useNavigate();

  // State variables
  const [note, setNote] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [noteEditLoader, setNoteEditLoader] = useState(false);
  const [editEnable, setEditEnable] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Note details fetch karne ka function
  const fetchNoteDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/notes");

      // All notes me se current note ko find karo
      const foundNote = response.data.find((n) => n.id.toString() === id);

      if (foundNote) {
        // Content ko parse karo - JSON se HTML
        try {
          const parsed = JSON.parse(foundNote.content);
          foundNote.parsedContent = parsed.content || parsed;
        } catch {
          // Parsing fail ho toh content as-is use karo
          foundNote.parsedContent = foundNote.content;
        }
        setNote(foundNote);
      } else {
        setError("Note not found");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err.message ||
        "Failed to fetch note details";
      setError(errorMessage);
      console.error("Error fetching note details", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Component mount hone par note fetch karo
  useEffect(() => {
    if (id) {
      fetchNoteDetails();
    }
  }, [id, fetchNoteDetails]);

  // Note content change hone par editor me set karo
  useEffect(() => {
    if (note?.parsedContent) {
      setEditorContent(note.parsedContent);
    }
  }, [note?.parsedContent]);

  // Editor content change handler
  const handleChange = (content) => {
    setEditorContent(content);
  };

  // Note update karne ka handler
  const onNoteEditHandler = async () => {
    if (editorContent.trim().length === 0) {
      return toast.error("Note content shouldn't be empty");
    }

    try {
      setNoteEditLoader(true);
      const noteData = { content: editorContent };

      // Backend ko PUT request bhejo
      await api.put(`/notes/${id}`, noteData);

      toast.success("Note updated successfully");
      setEditEnable(false);

      // Note ko re-fetch karo taaki updated content dikhe
      fetchNoteDetails();
    } catch {
      toast.error("Failed to update note");
    } finally {
      setNoteEditLoader(false);
    }
  };

  // Error state
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading note details..." />;
  }

  return (
    <div className="min-h-[calc(100vh-74px)] bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Notes
          </Button>

          {/* Main Card */}
          <Card className="shadow-2xl border-none dark:bg-gray-800 dark:border-gray-700">
            {/* Header with action buttons */}
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Created on{" "}
                {moment(note?.createdAt).format("MMMM D, YYYY [at] h:mm A")}
              </div>
              <div className="flex gap-2">
                {!editEnable ? (
                  <>
                    <Button
                      onClick={() => setEditEnable(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => setModalOpen(true)}
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setEditEnable(false)}
                    variant="outline"
                    className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            {/* Content Area */}
            <CardContent className="p-6 dark:bg-gray-800">
              {editEnable ? (
                // Edit Mode - ReactQuill editor dikhao
                <>
                  <div className="h-96 mb-4 dark-mode-editor">
                    <ReactQuill
                      className="h-full bg-white dark:bg-gray-900 rounded-lg"
                      value={editorContent}
                      onChange={handleChange}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          [{ size: [] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
                          [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                          ],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                  <div className="flex justify-end mt-20">
                    <Button
                      onClick={onNoteEditHandler}
                      disabled={noteEditLoader}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {noteEditLoader ? "Updating..." : "Update Note"}
                    </Button>
                  </div>
                </>
              ) : (
                // View Mode - Note content dikhao
                <div
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: note?.parsedContent }}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteNoteModal open={modalOpen} setOpen={setModalOpen} noteId={id} />
    </div>
  );
};

export default NoteDetails;
