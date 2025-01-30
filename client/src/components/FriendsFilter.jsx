import React from "react";

const FriendsFilter = ({
  friends,
  selectedFriend,
  problemIdFilter,
  problemIndexFilter,
  handleFriendChange,
  handleProblemIdFilterChange,
  handleProblemIndexFilterChange,
}) => {
  return (
    <div className="flex gap-10 justify-center m-10">
      <div className="flex gap-5">
        <label htmlFor="friendDropdown">Select Friend:</label>
        <select
          id="friendDropdown"
          value={selectedFriend}
          onChange={handleFriendChange}
        >
          <option value="">-- Select a Friend --</option>
          {friends.map((friend) => (
            <option key={friend} value={friend}>
              {friend}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-5">
        <label htmlFor="problemIdFilter">Problem ID:</label>
        <input
          type="text"
          id="problemIdFilter"
          value={problemIdFilter}
          onChange={handleProblemIdFilterChange}
        />
      </div>
      <div className="flex gap-5">
        <label htmlFor="problemIndexFilter">Problem Index:</label>
        <input
          type="text"
          id="problemIndexFilter"
          value={problemIndexFilter}
          onChange={handleProblemIndexFilterChange}
        />
      </div>
    </div>
  );
};

export default FriendsFilter;
