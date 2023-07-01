import React, { useState, useEffect } from "react";
import "./Home.css";
import RecipeCards from "../components/RecipeCards";
import RecipeIndex from "../components/RecipeIndex";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate } from "react-router-dom";


function Home() {
  
  const [indexUrl, setIndexUrl] = useState("");
  const [item, setItem] = useState();
  const [display, setDisplay]=useState(false);
  const [search, setSearch]=useState("");
  const [vegetarian, setVegetarian] = useState([]);
  const [seafood, setSeafood] = useState([]);
  let goTo = useNavigate();

  useEffect( () => {
    fetch(indexUrl).then(res=>res.json()).then(data=>{
      //console.log(data.meals);
      setItem(data.meals);
      setDisplay(true);
    });
  }, [indexUrl]);

  const setIndex =(alpha)=>{
    setIndexUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`)
  }

  const searchRecipe=(event)=>{
      if(event.key==="Enter"){
        setIndexUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      }
  }

  useEffect(()=>{
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian").then(
      res=>res.json()
    ).then(data=>{
      setVegetarian(data.meals);
    });
  }, []);

  useEffect(()=>{
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood").then(
      res=>res.json()
    ).then(data=>{
      setSeafood(data.meals);
    });
  }, []);


  return (
    <div className="home">
      <div className="search-form">
        <input className="search-bar" type="search" placeholder="Search your food recipe" 
         onChange={e=>setSearch(e.target.value)} onKeyDown={searchRecipe}/>
      </div>
      <div className="indexContainer">
        <RecipeIndex alphaIndex={(alpha)=>setIndex(alpha)}/>
      </div>
      <div className="recipe-container">
          {display ? <RecipeCards data={item}/> : 
             <div className="showcase">
                  <h3>Vegetarian Picks</h3>
                  <Splide options={{
                    perPage: 6,
                    drag: "free",
                    gap: "0.7rem"
                  }}>
                    {vegetarian.map( (vegi)=> {
                        return(
                          <SplideSlide >
                            <div className="card" key={vegi.idMeal} onClick={()=>goTo(`/${vegi.idMeal}`)}>
                              <p>{vegi.strMeal}</p>
                              <img src={vegi.strMealThumb} alt={vegi.strMeal}/>
                            </div>
                          </SplideSlide>
                        );
                    })}
                  </Splide>
                  <br/>
                  <h3>Seafood</h3> 
                  <Splide options={{
                    perPage: 6,
                    drag: "free",
                    gap: "0.7rem"
                  }}>
                    {seafood.map( (seaf)=> {
                        return(
                          <SplideSlide >
                            <div className="card" key={seaf.idMeal} onClick={()=>goTo(`/${seaf.idMeal}`)}>
                              <p>{seaf.strMeal}</p>
                              <img src={seaf.strMealThumb} alt={seaf.strMeal}/>
                            </div>
                          </SplideSlide>
                        );
                    })}
                  </Splide>

             </div>
          }  
      </div>
      
    </div>
  );
}

export default Home;
