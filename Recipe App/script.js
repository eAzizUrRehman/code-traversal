const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipePopup = document.querySelector(".recipe-popup");
const recipePopupCloseBtn = document.querySelector(".recipe-popup-close-btn");
const recipeContent = document.querySelector(".recipe-content");

const fetchRecipes = async (input) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    const response = await data.json();
    response.meals.forEach((meal) => {
      console.log(`${meal.strArea}`);
    });

    recipeContainer.innerHTML = "";

    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div"); // creating a div
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> </p>    
    `;

      const button = document.createElement("button");
      button.classList.add("view-recipe-btn");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    recipeContainer.style.color = "rgba(255, 0, 0, 0.9";
  }
};
recipeContainer.style.color = "#ffffff";

const openRecipePopup = (meal) => {
  recipeContent.innerHTML = `
  <h2 class= "recipeName">${meal.strMeal}</h2>
  <h3 class= "ingredientsHeading">Ingredients:</h3>
  <ul class= "ingredientsList">${fetchIngredients(meal)}</ul>
  <div class= "instructions">
  <h3 class= "instructionsHeading">Instructions:</h3>
  <p>${meal.strInstructions}</p>
</div>  
  `;

  recipeContent.parentElement.style.display = "block"; // it's by default none
};

const fetchIngredients = (meal) => {
  // the API is giving 20 ingredients and 20 measurements
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measurement = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measurement} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

recipePopupCloseBtn.addEventListener("click", () => {
  recipeContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the recipe in the search box.</h2>`;
    recipeContainer.style.color = "rgba(255, 0, 0, 0.9";
    return;
  }
  recipeContainer.style.color = "#ffffff";
  fetchRecipes(searchInput);
});