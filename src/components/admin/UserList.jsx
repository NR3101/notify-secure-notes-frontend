import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Calendar, Eye } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import api from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import Pagination from "../common/Pagination";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Users ko fetch karne ka function - backend se saare users ki list laate hain
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/getusers");
        const usersData = Array.isArray(response.data) ? response.data : [];
        setUsers(usersData);
      } catch (err) {
        setError(err?.response?.data?.message);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

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

  return (
    <div className="p-6">
      <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-gray-700">
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentUsers.map((user) => {
                  const formattedDate = moment(user.createdDate).format(
                    "MMMM DD, YYYY, hh:mm A"
                  );

                  return (
                    <tr
                      key={user.userId}
                      className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.userName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Mail className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                          {formattedDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.enabled
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {user.enabled ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Link to={`/admin/users/${user.userId}`}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No users found
              </div>
            )}
          </div>

          {/* Pagination */}
          {users.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;
