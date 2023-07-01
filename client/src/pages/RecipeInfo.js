import React, { useState}  from "react";
import { useParams } from "react-router-dom";
import "./RecipeInfo.css";

let vId="";

function RecipeInfo(){

    const {MealId} = useParams();
    const[item, setItem] = useState();
    
    if(MealId !== ""){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
        .then(res=>res.json())
        .then(data=>{
            setItem(data.meals[0]);
        });
    }
    
    if(item){
        const url = item.strYoutube;
        const str = url.split("=");
        vId = str[str.length-1];
    }


    return(
    <>
        {
            (!item)? "":
            <>
               <div className="content">
                  <img src={item.strMealThumb} alt="" />
                  <div className="inner-content">
                       <h1>{item.strMeal}</h1>
                       <h3>{item.strArea} Food</h3>
                       <h3>Category: {item.strCategory}</h3>
                  </div>
               </div>
               <div className="recipe-details">
                    <div className="ingredients">
                        <h2>Ingredients</h2> <br/>
                        <p>{item.strIngredient1} {item.strMeasure1}, {item.strIngredient2} {item.strMeasure2}, {item.strIngredient3} {item.strMeasure3}, 
                        {item.strIngredient4} {item.strMeasure4}, {item.strIngredient5} {item.strMeasure5}, {item.strIngredient6} {item.strMeasure6},
                        {item.strIngredient7} {item.strMeasure7}, {item.strIngredient8} {item.strMeasure8}, {item.strIngredient9} {item.strMeasure9},
                        {item.strIngredient10} {item.strMeasure10}, {item.strIngredient11} {item.strMeasure11}, {item.strIngredient12} {item.strMeasure12},
                        {item.strIngredient13} {item.strMeasure13}, {item.strIngredient14} {item.strMeasure14}, {item.strIngredient15} {item.strMeasure15},
                        {item.strIngredient16} {item.strMeasure16}, {item.strIngredient17} {item.strMeasure17}, {item.strIngredient18} {item.strMeasure18},
                        {item.strIngredient19} {item.strMeasure19}, {item.strIngredient20} {item.strMeasure20}</p>
                        
                    </div>
                    <div className="instructions">
                        <h2>Instructions</h2> <br/>
                        <p>{item.strInstructions}</p>
                    </div>
                    <div className="video">
                        <iframe src={`https://www.youtube.com/embed/${vId}`}>
                        </iframe>
                    </div>
               </div>


            </>
        }
        
    </>
    );
}

export default RecipeInfo;