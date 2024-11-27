
const apiUrl = 'https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json';
let recipes = [];

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    recipes = data;
    displayRecipes(recipes);
  });

//MODALE:
function showRecipeDetails(recipe) {
  document.getElementById('recipeTitle').textContent = recipe.name;
  document.getElementById('recipeImage').src = recipe.image;
  document.getElementById('recipeTime').textContent = recipe.time;
  document.getElementById('recipeAppliance').textContent = recipe.appliance;
  document.getElementById('recipeUstensils').textContent = recipe.ustensils.join(', ');
  document.getElementById('recipeDescription').textContent = recipe.description;

  const ingredientsList = document.getElementById('recipeIngredients');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = `${ingredient.ingredient}: ${ingredient.quantity || ''} ${ingredient.unit || ''}`;
    ingredientsList.appendChild(listItem);
  });
  document.getElementById('recipeModal').style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('recipeModal').style.display = 'none';
});


//RECHERCHE:
function displayRecipes(recipes) {
  const recipeGrid = document.getElementById('recipeGrid');
  recipeGrid.innerHTML = '';
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('card');
    let recipe_img_without_extension = recipe.image.split('.').slice(0, -1).join('.');
    card.innerHTML = `
      <img src="images/webp_output/${recipe_img_without_extension}.webp" alt="${recipe.name}">
      <h2>${recipe.name}</h2>
    `;
    card.addEventListener('click', () => showRecipeDetails(recipe));
    recipeGrid.appendChild(card);
  });
}

document.getElementById('searchBar').addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
  displayRecipes(filteredRecipes);
});


module.exports = { showRecipeDetails, displayRecipes };