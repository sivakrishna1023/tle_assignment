// controllers/codechef_contest.js
const ErrorHandler = require("../utills/Errorhandler");
const catchAsyncErrors = require("../utills/catchAsyncErrors");

/**
 * Helper function to convert ISO date string to Unix timestamp (seconds)
 */
function convertToUnixTimestamp(isoString) {
  const dateObj = new Date(isoString);
  return Math.floor(dateObj.getTime() / 1000);
}

/**
 * 1) HELPER FUNCTION: fetchCodeChefContests()
 *    - Fetches data from the CodeChef API
 *    - Transforms each contest into the required format
 *    - Separates them into current, upcoming, and past
 *    - Returns an object with current_contests, upcoming_contests, past_contests
 */
async function fetchCodeChefContests() {
  const url = "https://www.codechef.com/api/list/contests/all";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch CodeChef contests. Status: ${response.status}`);
  }

  const data = await response.json();

  // Transform a single contest object
  function transformContest(contest) {
    const startTimeSeconds = convertToUnixTimestamp(contest.contest_start_date_iso);
    const durationSeconds = Number(contest.contest_duration) * 60;
    const endTimeSeconds = startTimeSeconds + durationSeconds;

    return {
      Name: contest.contest_name,
      Platform: "Codechef",
      Duration: (Number(contest.contest_duration) / 60) + " hours",
      "Start Time": contest.contest_start_date,
      Contest_id: contest.contest_code,
      starttimeint: startTimeSeconds,
      endTimeInt: endTimeSeconds, // Used to filter contests
    };
  }

  // Separate the contests
  const presentContests = (data.present_contests || []).map(transformContest);
  const futureContests = (data.future_contests || []).map(transformContest);
  const pastContests = (data.past_contests || []).map(transformContest);

  // Return them as current, upcoming, and past
  return {
    current_contests: presentContests,
    upcoming_contests: futureContests,
    past_contests: pastContests,
  };
}

/**
 * 2) CONTROLLER FUNCTION: Get_CodeChef_Contest
 *    - Calls fetchCodeChefContests()
 *    - Sends the final response
 */
exports.Get_CodeChef_Contest = catchAsyncErrors(async (req, res, next) => {
  try {
    const result = await fetchCodeChefContests();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Export the helper function for combining with other platforms if needed
exports.fetchCodeChefContests = fetchCodeChefContests;
