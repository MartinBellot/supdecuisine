
const apiUrl = 'https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const recipeGrid = document.getElementById('recipeGrid');
    data.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="images/${recipe.image}" alt="${recipe.name}">
        <h2>${recipe.name}</h2>
      `;
      card.addEventListener('click', () => showRecipeDetails(recipe));
      recipeGrid.appendChild(card);
    });
  });

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
