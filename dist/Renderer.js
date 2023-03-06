class Renderer{
    constructor(){
        this.currentPageNumber = 0
        this.numberOfRecipes = 0
        
    }
    setPageNumber(pageNumber){
        this.currentPageNumber = pageNumber
    }
    setNumberOfRecipes(numberOfRecipes){
        this.numberOfRecipes = numberOfRecipes
    }
    recipesRender(recipes){
        const recipes_div = $('.recipes')
        recipes_div.empty()
        if(!recipes || recipes.length === 0){
            recipes_div.append($('<h2>there is no recipies for this ingridient</h2>'))
            return
        }
        
        const source = $('#recipe-template').html()
        const template = Handlebars.compile(source)
        for(let recipe of recipes){
            const newHTML = template(recipe)
            recipes_div.append(newHTML)
        }
    }

    recipesFilter(recipes, sensitives){
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
    getPreviousPage(){
        if(this.currentPageNumber > 1){
            return this.currentPageNumber - 1
        }
        return -1
    }
    getNextPage(){
        if(this.currentPageNumber < this.numberOfRecipes - 1){
            return this.currentPageNumber + 1
        }
        return -1
    }
    increntCurrenPage(){
        this.currentPageNumber ++
    }
    decrementCurrentPage(){
        this.currentPageNumber--
    }

}
