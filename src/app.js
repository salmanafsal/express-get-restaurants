const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (req, res) => {
    const rest = await Restaurant.findAll({});
    /*res.json(rest);*/
    res.json(rest);
})

app.get('/restaurants/:id', async (req, res) => {

    console.log('hi');
    const user = await Restaurant.findByPk(req.params.id);

    try{
    if (!user) {
        return res.status(404).json({ error: "Restaurant not found" });
    }
    
    res.json(user);
} catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
}

  });



module.exports = app;