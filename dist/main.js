// TODO: when there is no recipes add massege
dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]
function  recipesRender(recipes){
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


$('#search-button').on('click', function(){
    let ingredient = $('#search-input').val()

    if(!ingredient){
        alert('Please insert an ingredient')
        return
    }
    let glutenFree = $('#gluten-free').is(":checked")
    let diaryFree = $('#diary-free').is(":checked")

    $.get(`recipes/${ingredient}?page=1&limit=3`, function(response){
        console.log(response)
        
        if(response){
            if(diaryFree){
            for(let i=0; i < response.recipes.length; i++){
                for(let ing of response.recipes[i].ingredients){
                    ing = ing.charAt(0).toUpperCase() + ing.slice(1);
                    if(dairyIngredients.includes(ing)){
                        response.recipes.splice(i,1)
                        i-=1
                        break
                    }
                }
            }
        }
        if(glutenFree){
            for(let i=0; i < response.recipes.length; i++){
                for(let ing of response.recipes[i].ingredients){
                    ing = ing.charAt(0).toUpperCase() + ing.slice(1);
                    if(glutenIngredients.includes(ing)){
                        response.recipes.splice(i,1)
                        i-=1
                        break
                    }
                }
            }
        }
            window.nextPage = response.nextPage
            window.previousPage = response.previousPage
            window.recipesLength = response.recipes.length
            recipesRender(response.recipes)
        }
        else{
            recipesRender([])
        }

    })
})
$('.recipes').on('click', '.recipe-img', function(){ 
    let firstIngredient = $(this).closest('.recipe').find('li:first').text()
    alert(firstIngredient)
})

$('#next').on('click', function(){
    let ingredient = $('#search-input').val()
    if(window.nextPage < window.recipesLength){
        $.get(`recipes/${ingredient}?page=${window.nextPage++}&limit=3`,function(response){
            recipesRender(response.recipes)
            window.previousPage++
            
        })
    }

})
$('#previous').on('click', function(){
    let ingredient = $('#search-input').val()
    if(window.previousPage > 0){
        $.get(`recipes/${ingredient}?page=${window.previousPage--}&limit=3`,function(response){
            recipesRender(response.recipes)
            window.nextPage--
        })
    }

})