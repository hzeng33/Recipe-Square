import React, { useState, useEffect } from "react";
import "./AddRecipes.css";
import  PropTypes  from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import EditRecipe from "../components/editRecipe";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

function RecipeAdding(){

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [recipe_name, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
             const body = {recipe_name, ingredients, instructions};
             const response = await fetch("http://localhost:8080/recipeAdd",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
             });

             //console.log(response);
             window.location="/recipeAdd";
             setRecipeName("");
             setIngredients("");
             setInstructions("");
        } catch (err) {
            console.error(err.message);
        }
    };
    
    //Show recipe list.
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {
        try {
            const res = await fetch("http://localhost:8080/recipeAdd");
            const jsonData = await res.json();
            
            setRecipes(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);
    //console.log(recipes);


    //Delete recipe function.
    const deleteRecipe = async (id) => {
        try {
            const deleteRecipe = await fetch(`http://localhost:8080/recipeAdd/${id}`, {
                method: "DELETE"
            });

            //console.log(deleteRecipe);
            setRecipes(recipes.filter(recipe => recipe.recipe_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    
    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen} class="btn-block">
                ADD RECIPE
            </Button>
            <BootstrapDialog
               fullWidth
               onClose={handleClose}
               aria-labelledby="customized-dialog-title"
               open={open}
             >
             <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add your favorite recipe
             </BootstrapDialogTitle>
             <DialogContent dividers>
                  <form className="form-field" onSubmit={handleSubmit}>
                  <label htmlFor="recipe_name">Recipe Name: </label>
                  <input type="text" id="recipe_name" name="recipe_name" value={recipe_name} 
                        onChange={e => setRecipeName(e.target.value)} />

                  <label htmlFor="ingredients">Ingredients: </label>
                  <textarea type="text" id="ingredients" name="ingredients" value={ingredients} 
                        onChange={e => setIngredients(e.target.value)} />

                  <label htmlFor="instructions">Instructions: </label>
                  <textarea type="text" id="instructions" name="instructions" value={instructions} 
                        onChange={e => setInstructions(e.target.value)} />
                 <button className="submit-btn">Submit</button>
              </form>
             </DialogContent>
            </BootstrapDialog>
         
        <div className="recipe-list">
            {recipes.map(recipe => (
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography><h2>{recipe.recipe_name}</h2></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <h3>Ingredients: </h3>
                    <p>{recipe.ingredients}</p>
                    <h3>Instructions: </h3>
                    <p>{recipe.instructions}</p>
                  </Typography>
                </AccordionDetails>
                <Stack direction="row" spacing={2}>
                    <EditRecipe recipe={recipe}/>
                    <Button variant="contained" color="warning" onClick={() => deleteRecipe(recipe.recipe_id)}>DELETE</Button>
                </Stack>
                
              </Accordion>
            ))}
        
        </div> 
         
        
    </div>
    );
}

export default RecipeAdding;