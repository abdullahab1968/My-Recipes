const express = require('express')
const router = express.Router()
const axios = require('axios')
const RECIPES_URL = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"
const data = require('../data/sensitivity')
const dairyIngredients = data.dairyIngredients
const glutenIngredients = data.glutenIngredients
const filter = require('../services/filter').recipesFilter

router.get('/recipes/:ingredient', function(req, res){
    
    return axios.get(RECIPES_URL + req.params.ingredient)
    .then(response => {
        let recipes = response.data.results
   
        recipes = recipes.map(r => {return  {
            title: r.title, ingredients: r.ingredients,thumbnail: r.thumbnail,
            idMeal: r.idMeal, href: r.href  
    }})
        if(recipes.length === 0){
            res.status(204).send({'error': `there is no recipes for  ${req.params.ingredient}`})
            return
    }  
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page-1) * limit
    const endIndex = page * limit
    const isGlutenFree = req.query.glutenFree
    const isDiaryFree = req.query.diaryFree
    console.log(recipes.length)
    if(isDiaryFree === 'true'){
        filter(recipes, dairyIngredients)
    }
    if(isGlutenFree === 'true'){
        filter(recipes, glutenIngredients)
    }
    console.log(recipes.length)
    recipes = recipes.slice(startIndex, endIndex)
    res.send(recipes)
    })
})

module.exports = router