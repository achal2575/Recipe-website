const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const receipeContainer = document.querySelector(".receipe-container");
const receipeDetailsContent = document.querySelector(".receipe-details-content");
const receipeCloseBtn = document.querySelector(".receipe-close-btn");

// meal db api
const fetchRecipes = async (query) => {
    receipeContainer.innerHTML = "Fetching Receipes";
    const data  = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();


    receipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const receipeDiv = document.createElement('div')
        receipeDiv.classList.add('receipe');
        receipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>

        `
        const button = document.createElement('button')
        button.textContent = "View Receipe";
        receipeDiv.appendChild(button);

        // adding event listener to receipe button 

        button.addEventListener('click',() =>{
            openReceipePopup(meal);
        })

        receipeContainer.appendChild(receipeDiv);
    });
    
}

// function to fetch ingredients and measurements 
const fetchIngredients = (meal) =>{
    let ingredientsList ="";
    for(let i=1; i<=20; i++){
       const ingredient = meal[`strIngredient${i}`];
       if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`
       }
       else{
        break;
       }
    }
    return ingredientsList;
}


const openReceipePopup =(meal) =>{
    receipeDetailsContent.innerHTML =`
        <h2 class="receipeName">${meal.strMeal}</h2>
        <h3>Ingredients : </h3>
        <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
       
        <div class="instructions">
            <h3 class="inst">Instruction : </h3>
            <p>${meal.strInstructions}</p>

        </div>

    `
    receipeDetailsContent.parentElement.style.display ="block";
}


receipeCloseBtn.addEventListener('click',() => {
    receipeDetailsContent.parentElement.style.display = "none";
})

const search = searchBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
 
});
