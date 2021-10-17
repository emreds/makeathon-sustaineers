import React from 'react';
import { useRef, useState } from "react";
import logo from './resources/refrig2.png';
import './App.css';
import Button from 'react-bootstrap/Button';
import Recipes from './Recipes';
import IngredientPrediction from './IngredientPrediction';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import Modal from 'react-bootstrap/Modal';
import FoodStorage from './FoodStorage';

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

let recipeReloadTimout: null | NodeJS.Timeout = null;


function App() {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagePreview = useRef<HTMLImageElement>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<[]>([]);
  const [ingredientsManually, setIngredientsManually] = useState<{ id: string, text: string }[]>([]);

  const [showFoodstorage, setShowFoodstorage] = useState(false);

  const handleCloseFoodstorage = () => setShowFoodstorage(false);
  const handleShowFoodstorage = () => setShowFoodstorage(true);

  function uploadImagePressed(e: any) {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function getRecipes(ingredients: string[]) {
    let queryString = "";
    ingredients.forEach(ingredient => {
      if (queryString != "") {
        queryString = queryString + "%2C";
      }
      queryString = queryString + ingredient;
    });
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + queryString + "&ranking=1&ignorePantry=true&number=5", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "70cfd6d9a8mshcd4b4466efb1641p1bb00djsna6c9dbc455f2"
      }
    })
      .then(response => {
        response.json().then(data => {
          setRecipes(data);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  function imageSelected(e: any) {
    if (fileInputRef.current) {
      const curFiles = fileInputRef.current.files;
      if (curFiles) {
        if (curFiles.length === 0) {

        } else {
          for (let i = 0; i < curFiles.length; i++) {
            let file = curFiles.item(i);
            let objectURL = URL.createObjectURL(file);
            if (imagePreview.current) {
              imagePreview.current.src = objectURL;
            }
            new IngredientPrediction().getIngredients(file).then(ingredients => {
              setIngredients(ingredients);
              let ingredientsMan = ingredientsManually.map((value, id) => value.text);
              getRecipes(ingredients.concat(ingredientsMan));
            });
          }
        }
      }
    }
  }

  function reloadRecipesPredicted(newIngredients: any[]) {
    if (recipeReloadTimout != null) {
      clearTimeout(recipeReloadTimout);
    }
    recipeReloadTimout = setTimeout(() => {
      recipeReloadTimout = null;
      let ingredientsMan = ingredientsManually.map((value, id) => value.text);
      getRecipes(newIngredients.concat(ingredientsMan));
    }, 2000);
  }

  function reloadRecipes(newIngredientsManually: any[]) {
    if (recipeReloadTimout != null) {
      clearTimeout(recipeReloadTimout);
    }
    recipeReloadTimout = setTimeout(() => {
      recipeReloadTimout = null;
      let ingredientsMan = newIngredientsManually.map((value, id) => value.text);
      getRecipes(ingredients.concat(ingredientsMan));
    }, 2000);
  }

  function handleDeletePredictedIngredient(i: number) {
    let newIngredients = ingredients.filter((ingredient, index) => index !== i);
    setIngredients(newIngredients);
    reloadRecipesPredicted(newIngredients);
  }

  function handleDelete(i: number) {
    let newIngredientsManually = ingredientsManually.filter((tag, index) => index !== i);
    setIngredientsManually(newIngredientsManually);
    reloadRecipes(newIngredientsManually);
  }

  function handleAddition(tag: any) {
    tag.text = tag.text.charAt(0).toUpperCase() + tag.text.slice(1);
    let newIngredientsManually = [...ingredientsManually, tag];
    setIngredientsManually(newIngredientsManually);
    reloadRecipes(newIngredientsManually);
  }

  function handleDrag(tag: any, currPos: number, newPos: number) {
    const tags = [...ingredientsManually];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setIngredientsManually(newTags);
  }

  const ingredientStrings = ingredients.map((ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1));

  const ingredientsTagFormat: { id: string, text: string }[] = [];
  ingredientStrings.forEach((ingredient) => ingredientsTagFormat.push({ id: ingredient, text: ingredient }));

  const ingredientsManuallyStrings = ingredientsManually.map((ingredient) => ingredient.text.charAt(0).toUpperCase() + ingredient.text.slice(1));
  let ingredientsUnique: string[] = ingredientStrings;
  ingredientsManuallyStrings.forEach(ingredient => {
    if (ingredientsUnique.indexOf(ingredient) == -1) {
      ingredientsUnique.push(ingredient);
    }
  });  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Virtual Refrigerator
          <img src={logo} className="App-logo" alt="logo" />
        </p>
      </header>
      <div className="App-body">
        <div className="Body-cell">
          <div className="Body-cell-element">
            <Button
              onClick={uploadImagePressed}
              variant="primary">Upload Image</Button>
          </div>
          <div><img className="Upload-image-preview" ref={imagePreview}></img></div>
          <input
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            id="file-input" type="file" name="name" className="file-input" onChange={imageSelected} />
        </div>
        <div className="Body-cell">
          <div>Ingredients:</div>
          <div className="Body-ingredients">
            <ReactTags
              tags={ingredientsTagFormat}
              handleDelete={handleDeletePredictedIngredient}
              handleDrag={() => { }}
              handleAddition={() => { }}
              delimiters={delimiters}
              allowDragDrop={false}
              classNames={{
                tags: 'tagsClass',
                tagInput: 'tagInputClassInvisible',
                tagInputField: 'tagInputFieldClass',
                selected: 'selectedClass',
                tag: 'tagClass',
                remove: 'removeClass btn btn-danger',
                suggestions: 'suggestionsClass',
                activeSuggestion: 'activeSuggestionClass'
              }}
            />
          </div>
          <div>
            <ReactTags
              // inputProps={{placeholder:"Manually add ingredient, press enter"}}
              placeholder="Add ingredient manually"
              tags={ingredientsManually}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              delimiters={delimiters}
              classNames={{
                tags: 'tagsClass',
                tagInput: 'tagInputClass',
                tagInputField: 'tagInputFieldClass',
                selected: 'selectedClass',
                tag: 'tagClass',
                remove: 'removeClass btn btn-danger',
                suggestions: 'suggestionsClass',
                activeSuggestion: 'activeSuggestionClass'
              }}
            />
          </div>
          <div> <a onClick={handleShowFoodstorage} className="App-link">How to store?</a></div>
        </div>
        <div className="Body-cell Body-cell-recipes">
          Recipes:
          <Recipes recipes={recipes}></Recipes>
        </div>

      </div>

      <Modal show={showFoodstorage} onHide={handleCloseFoodstorage}>
        <FoodStorage ingredients={ingredientsUnique}></FoodStorage>
      </Modal>
    </div>
  );
}

export default App;
