import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import { motion } from "framer-motion";
import moment from "moment";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { truncateText } from "@/utils/truncateText";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Backend se saare notes fetch karne ka function
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/notes");

      // Content ko parse karo - JSON format se HTML content nikalna hai
      const parsedNotes = response.data.map((note) => {
        let parsedContent;
        try {
          // Pehle JSON parse karne ki koshish karo
          const parsed = JSON.parse(note.content);
          parsedContent = parsed.content || parsed;
        } catch {
          // Agar parsing fail ho toh content as-is use karo
          parsedContent = note.content;
        }

        return {
          ...note,
          parsedContent,
        };
      });
      setNotes(parsedNotes);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch notes";
      setError(errorMessage);
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  // Component mount hone par notes fetch karo
  React.useEffect(() => {
    fetchNotes();
  }, []);

  // Error state - error message dikhao
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-[calc(100vh-74px)] bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-10 px-5 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Loading state */}
        {loading ? (
          <LoadingSpinner message="Loading your notes..." />
        ) : (
          <>
            {/* Header with title and create button */}
            {notes && notes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-8"
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
                  My Notes
                </h1>
                <Link to="/create-note">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Plus className="mr-2 h-5 w-5" />
                    Create Note
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Empty state - jab koi note nahi hai */}
            {notes && notes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-96 p-4"
              >
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                      <Plus className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-playfair">
                    No Notes Yet
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Start by creating your first note to keep track of your
                    thoughts and ideas.
                  </p>
                  <Link to="/create-note">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Your First Note
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              // Notes grid - saare notes ko grid me display karo
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Card className="h-96 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 group hover:scale-105">
                      <CardContent className="flex-1 overflow-hidden p-6">
                        <div
                          className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 overflow-hidden"
                          dangerouslySetInnerHTML={{
                            __html: truncateText(note.parsedContent, 300),
                          }}
                        />
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {moment(note.createdAt).format("D MMMM YYYY")}
                        </span>
                        <Link to={`/notes/${note.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 dark:text-gray-300 transition-colors"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
