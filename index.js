const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./dbConfig");
const PORT = process.env.PORT || 8080;

//process.env.PORT


//middleware
app.use(cors());
app.use(express.json()); //give access to req.body and get json data.


//Routes
//Create a recipe
app.post("/recipeAdd", async (req, res) => {
    try{
        const {recipe_name, ingredients, instructions} = req.body;
        const newRecipe = await pool.query("INSERT INTO recipes (recipe_name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *",
         [recipe_name, ingredients, instructions]
        );

        res.json(newRecipe.rows[0]);
    } catch(err){
        console.error(err.message);
    }
});


//Get all recipes
app.get("/recipeAdd", async (req,res) => {
    try {
        const allRecipes = await pool.query("SELECT * FROM recipes");
        res.json(allRecipes.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Get a recipe
app.get("/recipeAdd/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE recipe_id=$1", [id]);

        res.json(recipe.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//Update a recipe
app.put("/recipeAdd/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {recipe_name, ingredients, instructions} = req.body;
        const updateRecipe = await pool.query("UPDATE recipes SET recipe_name=$1, ingredients=$2, instructions=$3 WHERE recipe_id=$4",
        [recipe_name, ingredients, instructions, id]);

        res.json("Recipe was updated!");
    } catch (err) {
        console.error(err.message);
    }
});


//Delete a recipe
app.delete("/recipeAdd/:id", async (req, res) => {
 try {
    const {id} = req.params;
    const deleteRecipe = await pool.query("DELETE FROM recipes WHERE recipe_id=$1",
    [id]);

    res.json("Recipe was deleted!");
} catch (error) {
    console.error(error.message);
}
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});