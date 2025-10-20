import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "lucide-react";
import moment from "moment";
import api from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const AuditLogsDetails = () => {
  // URL se noteId nikaalte hain
  const { noteId } = useParams();

  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Specific note ki audit logs fetch karne ka function
  const fetchSingleAuditLogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/audit/note/${noteId}`);
      setAuditLogs(data);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.error("Error fetching audit logs", err);
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  // Component mount hone par audit logs fetch karte hain
  useEffect(() => {
    if (noteId) {
      fetchSingleAuditLogs();
    }
  }, [noteId, fetchSingleAuditLogs]);

  // Error state handle karte hain
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Loading state dikhate hain
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-74px)]">
        <LoadingSpinner />
      </div>
    );
  }

  // Agar logs nahi mile to error message dikhate hain
  if (auditLogs.length === 0) {
    return <ErrorMessage message="Invalid Note ID or no audit logs found" />;
  }

  return (
    <div className="p-6">
      <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Audit Logs for Note ID: {noteId}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Note Content
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {auditLogs.map((log) => {
                  const formattedDate = moment(log.timestamp).format(
                    "MMMM DD, YYYY, hh:mm A"
                  );

                  // Note content ko parse karte hain
                  let noteContent = "";
                  try {
                    const parsed = JSON.parse(log.noteContent);
                    noteContent = parsed.content || JSON.stringify(parsed);
                  } catch {
                    noteContent = log.noteContent || "";
                  }

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            log.action === "CREATE"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : log.action === "UPDATE"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {log.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                          {formattedDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div
                            dangerouslySetInnerHTML={{ __html: noteContent }}
                            className="prose prose-sm max-w-none dark:prose-invert"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogsDetails;
