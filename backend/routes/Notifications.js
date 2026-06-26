var express = require("express");
var router = express.Router();
var Notifications = require("../models/Notifications");

router.get("/:staffId", async function (req, res) {
    try {
        const rows = await Notifications.GetUnreadByStaff(req.params.staffId);
        res.json(rows);
    } catch (err) {
        console.error("Error loading notifications:", err);
        res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
});

router.patch("/:id/read", async function (req, res) {
    try {
        const result = await Notifications.MarkAsRead(req.params.id);
        res.json(result);
    } catch (err) {
        console.error("Error marking notification read:", err);
        res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
});

module.exports = router;
