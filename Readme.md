# Documentation for the TLE_Assignment based on retrieving the past, upcoming, and running contest of Leetcode, Codechef, Codeforces

## Backend

### API Endpoints

#### Endpoints for Contests

1. **GET** `{Domain}/api/v1/codeforces_contest`
    - Returns the past, upcoming, and running contests of Codeforces.
    - Uses the official API of Codeforces: `https://codeforces.com/api/contest.list`
    - Transforms the response into the required format.

2. **GET** `{Domain}/api/v1/codechef_contest`
    - Returns the past, upcoming, and running contests of CodeChef.
    - Uses the official API of CodeChef: `https://www.codechef.com/api/list/contests/all`
    - Transforms the response into the required format.

3. **GET** `{Domain}/api/v1/leetcode_contest`
    - Returns the past, upcoming, and running contests of LeetCode.
    - Uses GraphQL with the URL: `https://leetcode.com/graphql`
    - Queries the API to get contest details and transforms them into the required format.

4. **GET** `{Domain}/api/v1/get_all_contest`
    - Returns contests based on filters as query parameters, e.g., `{Domain}/api/v1/get_all_contest?filter=leetcode`
    - Uses the above three helper controllers and `Promise.all` to fetch the required platform contest details.

The response format for successful requests:
```json
res.status(200).json({
  success: true,
  data: {
     current_contests,
     upcoming_contests,
     past_contests,
  },
});
```

Each contest consists of data in the following format:
```json
{
  Name: "Contest name",
  Platform: "Platform name",
  Duration: "Calculated duration",
  "Start Time": "Human-readable start time",
  Contest_id: "Unique contest ID",
  starttimeint: "Start time for sorting",
  endTimeInt: "End time for duration calculation",
}
```

#### Endpoints for Bookmarks

A model is created with the user's email and bookmarks, where email is a string and bookmarks are an array of contest IDs.

5. **POST** `{Domain}/api/v1/bookMark_contest`
    - Takes email and contest_id as request parameters.
    - Responds with success or failure to add the bookmark for the user.

6. **POST** `{Domain}/api/v1/remove_bookmark_contest`
    - Takes email and contest_id as request parameters.
    - Responds with success or failure to remove the bookmark for the user.

7. **GET** `{Domain}/api/v1/myBookmarks`
    - Takes email as a request query parameter.
    - Responds with all the contest IDs that the user has bookmarked.

### File Structure

- **/controllers**: Contains the main logic to implement the API endpoints.
- **/config**: Contains the database connection.
- **/models**: Contains the schema for bookmarks.
- **/routes**: Contains the path routes for the endpoints.
- **index.js**: Contains the main server logic. Run the server using the command `node index.js`.

## Frontend

- **/public**: Contains all the images used for development.
- **/pages**: Contains two main pages, `Home.jsx` and `Contest.jsx`.
  - `Home.jsx`: Basic login page.
  - `Contest.jsx`: Contains three main functions:
     1. Fetching data for the initial render.
     2. Managing bookmarks (add with `handleBookMark` function and remove with `handle_remove_BookMark` function).
     3. Calculating the time to show how much time is left to start the upcoming contest.
- **/components**: Contains `Navbar.jsx`.
  - `Navbar.jsx`: Used to filter contests by platform.

Run the frontend using the command `npm run dev`.

## Quick Demo

For a quick demo of the TLE_Assignment project, you can watch the following video:

[Watch Demo](https://drive.google.com/file/d/1dcQfiG_fN6ZglpQf_OOaStD0c3lo-1zV/view)