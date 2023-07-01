import React from "react";
import { useNavigate } from "react-router-dom";

function RecipeCards({data}) {
  //console.log(data);
  let navigate = useNavigate();

  return (
    <>
      {(!data) ? <h2>Not Found</h2>: data.map(item=>{
        return(
          <div className="recipe-card" key={item.idMeal} onClick={()=>navigate(`/${item.idMeal}`)}>
              <img src={item.strMealThumb} alt=""/>
              <h3>{item.strMeal}</h3>
          </div>

        )
          
      })}
    </>
  
  );

}

export default RecipeCards;