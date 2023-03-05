const express = require('express')
const router = express.Router()
const axios = require('axios')
const RECIPES_URL = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"

router.get('/recipes/:ingredient', function(req, res){
    

    return axios.get(RECIPES_URL + req.params.ingredient)
    .then(response => {
        let recipes = response.data.results
   
        recipes = recipes.map(r => {return  {
            title: r.title, ingredients: r.ingredients,thumbnail: r.thumbnail,
            idMeal: r.idMeal, href: r.href  
    }})
        if(recipes.length === 0){
            console.log(recipes)
            res.status(204).send({'error': `there is no recipes for  ${req.params.ingredient}`})
            return
    }  
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page-1) * limit
    const endIndex = page * limit
    const results = {}
    if(endIndex < recipes.length){
        results.nextPage = page + 1
    }
    
        results.previousPage = page - 1
    
    results.recipes = recipes.slice(startIndex, endIndex)
    
    res.send(results)
    })
})

module.exports = router