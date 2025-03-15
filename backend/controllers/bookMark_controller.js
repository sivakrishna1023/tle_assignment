const ErrorHandler = require("../utills/Errorhandler");
const catchAsyncErrors = require("../utills/catchAsyncErrors");
const Bookmark = require("../models/bookmark_shema");

exports.BookMark_Contest = catchAsyncErrors(async (req, res, next) => {
    try {
        const { Contest_id, email } = req.body;

        let bookmark = await Bookmark.findOne({ email });

        if (!bookmark) {
            // User does not exist, create a new bookmark entry
            bookmark = new Bookmark({
                email,
                contest_ids: [Contest_id]
            });
        } else {
            // User exists, check if Contest_id is already in the array
            if (!bookmark.contest_ids.includes(Contest_id)) {
                bookmark.contest_ids.push(Contest_id);
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Contest_id already exists in the bookmark"
                });
            }
        }
        await bookmark.save();
        
        res.status(200).json({
            success: true,
            message: "Bookmark updated successfully",
            bookmark
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});
