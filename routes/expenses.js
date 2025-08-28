const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Expense = require("../models/Expense");

// Add expense
router.post("/", auth, async (req, res) => {
    try {
        const expense = new Expense({ ...req.body, userId: req.user.id });
        await expense.save();
        res.json(expense);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get user expenses
router.get("/", auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.json(expenses);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete expense
router.delete("/:id", auth, async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
