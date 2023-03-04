const express = require('express')
const router = express.Router()
const axios = require('axios')
const RECIPES_URL = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"

router.get('/recipes/:ingredient', function(req, res){
    axios.get(RECIPES_URL + req.params.ingredient).then(response => {
        let recipes = response.data.results
        recipes = recipes.map(r => {return  {
            title: r.title, ingredients: r.ingredients,thumbnail: r.thumbnail,
            idMeal: r.idMeal, href: r.href  
    }}) 
    return recipes
    }).then(recipes =>{ res.send(recipes)})
})

module.exports = router