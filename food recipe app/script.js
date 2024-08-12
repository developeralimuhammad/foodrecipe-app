const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const mealDetailsContent = document.querySelector(".meal-details-content");


// Event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () =>{
    mealDetailsContent.parentElement.classList.remove("showRecipe");
})



// Get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove("notFound");
        } else {
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add("notFound");
        }
        mealList.innerHTML = html;
    })
    .catch(error => console.error('Error fetching meal list:', error));
}

// Get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.closest(".meal-item");
        const mealId = mealItem.dataset.id;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); // Log the entire response
            mealRecipeModal(data.meals);
        })
        .catch(error => console.error('Error fetching meal data:', error));
    }
}

// Create a modal
function mealRecipeModal(meals) {
    if (meals && Array.isArray(meals) && meals.length > 0) {
        const meal = meals[0];
        console.log(meal);
        
    } else {
        console.error('No meals found or invalid data');
    }

    meals = meals[0];
    let html = `
         <h2 class="recipe-title">${meals.strMeal}</h2>
          <p class="recipe-category">
          ${meals.strCategory}
          </p>
          <div class="recipe-instruct"> 
              <h3>Instructions:</h3>
              <p>${meals.strInstructions}</p>
          </div>
          <div class="recipe-meal-img">
            <img src="${meals.strMealThumb}" alt="">
          </div>
          <div class="recipe-link">
            <a href="${meals.strYoutube}" target="_blank">Watch Video</a>
          </div>


    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");

}















