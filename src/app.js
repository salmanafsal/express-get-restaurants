const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (req, res) => {
    const rest = await Restaurant.findAll({});
    /*res.json(rest);*/
    res.json(rest);
})

app.get('/restaurants/:id', async (req, res) => {


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

  app.post("/restaurants", async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);
        res.status(201).json(newRestaurant); // 201 Created
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(400).json({ error: "Bad Request" });
    }
}); 

app.put("/restaurants/:id", async (req, res) => {
    try {
        const [affectedRows] = await Restaurant.update(req.body, {
            where: { id: req.params.id }
        });

        if (affectedRows > 0) {
            const updatedRestaurant = await Restaurant.findByPk(req.params.id);
            res.status(200).json(updatedRestaurant); // 200 OK
        } else {
            res.status(404).json({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(400).json({ error: "Bad Request" });
    }
});

app.delete("/restaurants/:id", async (req, res) => {
    try {
        const deleted = await Restaurant.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).send('It is deleted'); // 204 No Content
        } else {
            res.status(404).json({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = app;