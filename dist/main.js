
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
    $.get(`recipes/${ingredient}`, function(recipes){
        recipesRender(recipes)
    })
})