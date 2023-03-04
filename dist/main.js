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
    console.log(glutenFree, diaryFree);
    $.get(`recipes/${ingredient}`, function(recipes){
        recipesRender(recipes)
    })
})
$('.recipes').on('click', '.recipe-img', function(){ 
    let firstIngredient = $(this).closest('.recipe').find('li:first').text()
    alert(firstIngredient)
    console.log(firstIngredient);
})