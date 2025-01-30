import React from "react";

const FriendsTable = ({ loading, currentSubmissions, getVerdictLabel }) => {
  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-[90%] text-center border border-black mx-auto">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Name</th>
              <th>Verdict</th>
              <th>SUBMISSION</th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.map((contest) => {
              const { label, color } = getVerdictLabel(contest.verdict);
              return (
                <tr
                  className={`border border-black ${color} hover:bg-blue-100`}
                  key={`${contest.subId}`}
                >
                  <td>
                    <a
                      href={`https://codeforces.com/contest/${contest.contestId}/problem/${contest.index}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {contest.contestId}{contest.index}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`https://codeforces.com/contest/${contest.contestId}/problem/${contest.index}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {contest.name}
                    </a>
                  </td>
                  <td>{label}</td>
                  <td>
                    <a
                      href={`https://codeforces.com/contest/${contest.contestId}/submission/${contest.subId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {contest.subId}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FriendsTable;
