// TODO: when there is no recipes add massege
dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]
function  recipesRender(recipes){
    const recipes_div = $('.recipes')
    const source = $('#recipe-template').html()
    const template = Handlebars.compile(source)
    for(let recipe of recipes){
        const newHTML = template(recipe)
        recipes_div.append(newHTML)
    }
}
$('#search-button').on('click', function(){
    let ingredient = $('#search-input').val()
    let glutenFree = $('#gluten-free').is(":checked")
    let diaryFree = $('#diary-free').is(":checked")

    $.get(`recipes/${ingredient}`, function(recipes){
        console.log(recipes);
        if(diaryFree){
            for(let i in recipes){
                for(let ing of recipes[i].ingredients){
                    if(dairyIngredients.includes(ing)){
                        recipes.splice(i,1)
                    }
                }
            }
        }
        if(glutenFree){
            for(let i in recipes){
                for(let ing of recipes[i].ingredients){
                    if(glutenIngredients.includes(ing)){
                        recipes.splice(i,1)
                    }
                }
            }
        }
        console.log(recipes);
        // if(glutenFree){

        // }
        recipesRender(recipes)
    })
})
$('.recipes').on('click', '.recipe-img', function(){ 
    let firstIngredient = $(this).closest('.recipe').find('li:first').text()
    alert(firstIngredient)
})