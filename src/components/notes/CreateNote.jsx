import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NotepadText, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api";

const CreateNote = () => {
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ReactQuill ka content change hone par ye function call hoga
  const handleChange = (content) => {
    setEditorContent(content);
  };

  // Note create karne ka handler function
  const handleSubmit = async () => {
    // Agar content empty hai toh error dikhao
    if (editorContent.trim().length === 0) {
      return toast.error("Note content is required");
    }

    try {
      setLoading(true);
      const noteData = { content: editorContent };

      // Backend ko POST request bhejo
      await api.post("/notes", noteData);

      toast.success("Note created successfully");
      // Success hone par notes page par redirect karo
      navigate("/notes");
    } catch {
      toast.error("Error creating note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with back button */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <NotepadText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
                Create New Note
              </h1>
            </div>
          </div>

          {/* Editor Card */}
          <Card className="shadow-2xl border-none dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardTitle className="dark:text-gray-100">
                Write Your Note
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* ReactQuill Editor - Rich text editor for note content */}
              <div className="h-96 mb-4 dark-mode-editor">
                <ReactQuill
                  className="h-full bg-white dark:bg-gray-900 rounded-lg"
                  value={editorContent}
                  onChange={handleChange}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
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
                  placeholder="Start writing your note here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-20">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Creating..." : "Create Note"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateNote;
