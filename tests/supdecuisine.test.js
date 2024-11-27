const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync(path.resolve('index.html'), 'utf8');
const { showRecipeDetails, displayRecipes } = require('../script');

// script.test.js

let dom;
let document;

beforeEach(() => {
  dom = new JSDOM(html, { runScripts: 'dangerously' });
  document = dom.window.document;
  global.document = document;
  global.window = dom.window;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          name: 'Recipe 1',
          image: 'recipe1.jpg',
          time: '30 mins',
          appliance: 'Oven',
          ustensils: ['Spoon', 'Bowl'],
          description: 'Delicious recipe 1',
          ingredients: [
            { ingredient: 'Flour', quantity: 200, unit: 'g' },
            { ingredient: 'Sugar', quantity: 100, unit: 'g' }
          ]
        }
      ])
    })
  );
  require('../script');
});

test('fetches and displays recipes', async () => {
  await new Promise(setImmediate); // Wait for fetch to resolve
  const recipeGrid = document.getElementById('recipeGrid');
  expect(recipeGrid.children.length).toBe(1);
  expect(recipeGrid.children[0].querySelector('h2').textContent).toBe('Recipe 1');
});

test('displays recipe details in modal', () => {
  const recipe = {
    name: 'Recipe 1',
    image: 'recipe1.jpg',
    time: '30 mins',
    appliance: 'Oven',
    ustensils: ['Spoon', 'Bowl'],
    description: 'Delicious recipe 1',
    ingredients: [
      { ingredient: 'Flour', quantity: 200, unit: 'g' },
      { ingredient: 'Sugar', quantity: 100, unit: 'g' }
    ]
  };
  showRecipeDetails(recipe);
  expect(document.getElementById('recipeTitle').textContent).toBe('Recipe 1');
  expect(document.getElementById('recipeImage').src).toContain('recipe1.jpg');
  expect(document.getElementById('recipeTime').textContent).toBe('30 mins');
  expect(document.getElementById('recipeAppliance').textContent).toBe('Oven');
  expect(document.getElementById('recipeUstensils').textContent).toBe('Spoon, Bowl');
  expect(document.getElementById('recipeDescription').textContent).toBe('Delicious recipe 1');
  expect(document.getElementById('recipeIngredients').children.length).toBe(2);
});

test('closes modal on close button click', () => {
  document.getElementById('recipeModal').style.display = 'flex';
  document.getElementById('closeModal').click();
  expect(document.getElementById('recipeModal').style.display).toBe('none');
});

test('filters recipes based on search input', async () => {
  await new Promise(setImmediate); // Wait for fetch to resolve
  const searchBar = document.getElementById('searchBar');
  searchBar.value = 'Recipe 1';
  const event = new Event('input');
  searchBar.dispatchEvent(event);
  const recipeGrid = document.getElementById('recipeGrid');
  expect(recipeGrid.children.length).toBe(1);
  expect(recipeGrid.children[0].querySelector('h2').textContent).toBe('Recipe 1');
});
