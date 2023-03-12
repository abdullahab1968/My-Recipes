const recipesFilter = function(recipes, sensitives){
    for(let i=0; i < recipes.length; i++){
        for(let ingredient of recipes[i].ingredients){
            ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
            if(sensitives.includes(ingredient)){
                recipes.splice(i,1)
                i-=1
                break
            }
        }
    }
}
module.exports.recipesFilter = recipesFilter