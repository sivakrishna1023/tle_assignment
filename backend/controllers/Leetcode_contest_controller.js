// controllers/leetcode_contest.js
const ErrorHandler = require("../utills/Errorhandler");
const catchAsyncErrors = require("../utills/catchAsyncErrors");

// GraphQL endpoint and query
const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
const CONTESTS_QUERY = `
{
  allContests {
    title
    titleSlug
    startTime
    duration
    originStartTime
    isVirtual
    description
    containsPremium
  }
}
`;

// Helper function to format timestamps
function formatTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * 1) HELPER FUNCTION: fetchLeetCodeContests()
 *    - Fetches data from LeetCode's GraphQL API
 *    - Transforms each contest into the required format
 *    - Separates them into current, upcoming, and past
 *    - Returns an object with current_contests, upcoming_contests, past_contests
 */
async function fetchLeetCodeContests() {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: CONTESTS_QUERY }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const { data } = await response.json();
  const contests = data?.allContests || [];
  const currentTime = Math.floor(Date.now() / 1000);

  // Transform each contest
  const transformedContests = contests.map((c) => {
    const endTime = c.startTime + c.duration;
    return {
      Name: c.title,
      Platform: "Leetcode",
      Duration: (c.duration / 3600).toFixed(2) + " hours",
      "Start Time": formatTimestamp(c.startTime),
      Contest_id: c.titleSlug,
      starttimeint: c.startTime,
      endTimeInt: endTime,
    };
  });

  // Separate into current, upcoming, and past
  const currentContests = transformedContests.filter(
    (contest) => contest.starttimeint <= currentTime && contest.endTimeInt > currentTime
  );
  const upcomingContests = transformedContests.filter(
    (contest) => contest.starttimeint > currentTime
  );
  const pastContests = transformedContests.filter(
    (contest) => contest.endTimeInt <= currentTime
  );

  return {
    current_contests: currentContests,
    upcoming_contests: upcomingContests,
    past_contests: pastContests,
  };
}

/**
 * 2) CONTROLLER FUNCTION: Get_LeetCode_Contests
 *    - Calls fetchLeetCodeContests()
 *    - Sends the final response
 */
exports.Get_LeetCode_Contests = catchAsyncErrors(async (req, res, next) => {
  try {
    const result = await fetchLeetCodeContests();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Export the helper if you want to combine with other platforms
exports.fetchLeetCodeContests = fetchLeetCodeContests;
