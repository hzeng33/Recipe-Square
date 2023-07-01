import React from "react";
import "./About.css";



function About(){

    return(
        <div className="about">
            <h2>About RecipeSwap</h2>
            <p>Cooking can be an enjoyable activity. Since more and more people are working from home during and after Covid, 
                they usually like to cook for themselves. But sometimes, after cooking the same few dishes over and over again, 
                people feel bored and want to try something new to cook. Thus, RecipeSwap is built for this purpose. 
                RecipeSwap is a simple recipe sharing platform that enable users to search for recipes and to share 
                their favorite recipes. It also allows users to perform the CRUD (create, read, update, delete) operations.
            </p>
            <break></break>
            <h2>About the Developer</h2>
            <p>Hello, my name is Hannah Zeng. I am an aspiring Software Developer with an interest in web development. I am currently
                pursuing my second bachelor's degree in Computer Science with a minor in Mathematics at CUNY Queens College. 
                I am gratefull that I've learned many industry-relevant web development skills at CUNY Tech Prep. I hope to continue
                leveraging my technology skills throughout my career in Software Development. Feel free to contact me at 
                hzeng9310@gmail.com
            </p>
        </div>
    );
}

export default About;