const express = require("express");
const router = express.Router();

router.post('/foodsdata', (req,res)=>{
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        res.send("Server error")
    }
})

module.exports = router;