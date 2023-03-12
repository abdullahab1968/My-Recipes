const recipes_div = $('.recipes')
class Renderer{
    constructor(){
        this.currentPageNumber = 0
    }
    setPageNumber(pageNumber){
        this.currentPageNumber = pageNumber
    }
    recipesRender(recipes){
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

    
    getPreviousPage(){
        if(this.currentPageNumber > 1){
            return this.currentPageNumber - 1
        }
        return -1
    }
    getNextPage(){
        return this.currentPageNumber + 1
    }
    increntCurrenPage(){
        this.currentPageNumber ++
    }
    decrementCurrentPage(){
        this.currentPageNumber--
    }

}
