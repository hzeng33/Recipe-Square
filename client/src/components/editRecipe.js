import React, { useState } from "react";
import "../pages/AddRecipes.css";
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

function EditRecipe({recipe}) {
  
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setRecipeName(recipe.recipe_name);
      setIngredient(recipe.ingredients);
      setInstructions(recipe.instructions);
      setOpen(false);
    };

    const [recipe_name, setRecipeName] = useState(recipe.recipe_name);
    const [ingredients, setIngredient] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);

    //edit recipe function.
    const updateRecipe =  async (event) => {
        event.preventDefault();
        try {
            const body = {recipe_name, ingredients, instructions};
            const response = await fetch(`http://localhost:8080/recipeAdd/${recipe.recipe_id}`, {
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            setRecipeName("");
            setIngredient("");
            setInstructions("");
            window.location = "/recipeAdd";
            //console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    };
  
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          EDIT
        </Button>
        <BootstrapDialog
          fullWidth
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Edit Recipe
          </BootstrapDialogTitle>
          <DialogContent>
          <form className="form-field" >
                  <label htmlFor="recipe_name">Recipe Name: </label>
                  <input type="text" id="recipe_name" name="recipe_name" value={recipe_name}
                        onChange={e => setRecipeName(e.target.value)} />

                  <label htmlFor="ingredients">Ingredients: </label>
                  <textarea type="text" id="ingredients" name="ingredients" value={ingredients}
                       onChange={e => setIngredient(e.target.value)}/>

                  <label htmlFor="instructions">Instructions: </label>
                  <textarea type="text" id="instructions" name="instructions" value={instructions}
                         onChange={e => setInstructions(e.target.value)}/>

                 <button className="submit-btn" onClick={e => updateRecipe(e)}>Edit</button>
              </form>
          </DialogContent>
          
        </BootstrapDialog>
      </div>
  );
}

export default EditRecipe;
