import React from "react";

function RecipeIndex({alphaIndex}){

    const alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N",
                     "O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let num = 0;

    return(
        <>
           {alphabet.map(item=>{
                return(
                    <div className="indexBox" key={num++}
                        onClick={()=>alphaIndex(item)}>
                        <h3>{item}</h3>
                    </div>
                )
           })
           }
        </>
    );
}

export default RecipeIndex;