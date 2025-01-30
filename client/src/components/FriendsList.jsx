import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendsTable from "./FriendsTable";
import FriendsFilter from "./FriendsFilter";
import Pagination from "./Pagination";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [contestData, setContestData] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [problemIdFilter, setProblemIdFilter] = useState("");
  const [problemIndexFilter, setProblemIndexFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(20); // Number of submissions to display per page
  const [loading, setLoading] = useState(false);

  const getVerdictLabel = (verdict) => {
    switch (verdict) {
      case "OK":
        return { label: "Accepted", color: "bg-green-200" };
      case "WRONG_ANSWER":
        return { label: "WA", color: "bg-red-200" };
      case "CHALLENGED":
        return { label: "HACKED", color: "bg-orange-200" };
      case "COMPILATION_ERROR":
        return { label: "Compilation Error", color: "bg-yellow-200" };
      case "TIME_LIMIT_EXCEEDED":
        return { label: "Time Limit Exceeded", color: "bg-blue-200" };
      default:
        return { label: verdict, color: "bg-gray-200" };
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/friends");
        const data = response.data;

        if (data.status === "OK") {
          setFriends(data.result);
        }
        // Process the friends data
      } catch (error) {
        console.error("API request failed:", error);
      }
    };
    fetchFriends();
  }, []);

  const fetchSubmissions = async (handle) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/status/${handle}`
      );
      const data = response.data;

      if (data.status === "OK") {
        const submissions = data.result.map((obj) => ({
          handle: handle,
          contestId: obj.problem.contestId,
          index: obj.problem.index,
          name: obj.problem.name,
          verdict: obj.verdict,
          subId: obj.id,
        }));
        setContestData(submissions);
      }
    } catch (error) {
      console.error(`API request for ${handle} failed:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFriend !== "") {
      fetchSubmissions(selectedFriend);
    }
  }, [selectedFriend]);

  const handleFriendChange = (event) => {
    const newFriend = event.target.value;
    setSelectedFriend(newFriend);
    setContestData([]); // Clear old submissions when selecting a new friend
    setCurrentPage(1); // Reset to the first page when selecting a new friend

    if (newFriend !== "") {
      fetchSubmissions(newFriend);
    }
  };

  const handleProblemIdFilterChange = (event) => {
    const value = event.target.value;
    setProblemIdFilter(value);
  };

  const handleProblemIndexFilterChange = (event) => {
    const value = event.target.value;
    setProblemIndexFilter(value);
  };

  // Get current submissions based on pagination and filters
  const filteredSubmissions = contestData.filter((contest) => {
    if (problemIdFilter !== "" && contest.contestId != problemIdFilter) {
      return false;
    }
    if (problemIndexFilter !== "" && contest.index !== problemIndexFilter) {
      return false;
    }
    return true;
  });

  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = filteredSubmissions.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  return (
    <div className="border bg-slate-200 max-w-[70vw] mx-auto min-h-screen">
      <h2 className="text-6xl text-center mt-5  ">Friends Submission Filter</h2>
      {/* Form and Filters */}
      <FriendsFilter
        friends={friends}
        selectedFriend={selectedFriend}
        problemIdFilter={problemIdFilter}
        problemIndexFilter={problemIndexFilter}
        handleFriendChange={handleFriendChange}
        handleProblemIdFilterChange={handleProblemIdFilterChange}
        handleProblemIndexFilterChange={handleProblemIndexFilterChange}
      />
      {/* Submissions Table */}
      <FriendsTable
        loading={loading}
        currentSubmissions={currentSubmissions}
        getVerdictLabel={getVerdictLabel}
      />
      {/* Pagination */}
      <Pagination
        submissionsPerPage={submissionsPerPage}
        totalSubmissions={filteredSubmissions.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default FriendsList;
