// TODO: when there is no recipes add massege

const LIMTIT_PER_PAGE = 3

const render = new Renderer()



$('#search-button').on('click', function(){
    let ingredient = $('#search-input').val()
    if(!ingredient){
        alert('Please insert an ingredient')
        return
    }
    let isGlutenFree = $('#gluten-free').is(":checked")
    let isDiaryFree = $('#diary-free').is(":checked")

    $.get(`recipes/${ingredient}?page=1&limit=${LIMTIT_PER_PAGE}
           &glutenFree=${isGlutenFree}&diaryFree=${isDiaryFree}`, function(recipes){
        if(recipes){
            render.recipesRender(recipes)
            render.setPageNumber(1)
        }
    })
})

$('.recipes').on('click', '.recipe-img', function(){ 
    let firstIngredient = $(this).closest('.recipe').find('li:first').text()
    alert(firstIngredient)
})

$('#next').on('click', function(){
    let ingredient = $('#search-input').val()
    let isGlutenFree = $('#gluten-free').is(":checked")
    let isDiaryFree = $('#diary-free').is(":checked")
        $.get(`recipes/${ingredient}?page=${render.getNextPage()}&limit=${LIMTIT_PER_PAGE}
            &glutenFree=${isGlutenFree}&diaryFree=${isDiaryFree}`,function(recipes){
            console.log(recipes)
            if(recipes && recipes.length > 0){
                render.recipesRender(recipes)
                render.increntCurrenPage()
            }  
        })
})
$('#previous').on('click', function(){
    let ingredient = $('#search-input').val()
    let isGlutenFree = $('#gluten-free').is(":checked")
    let isDiaryFree = $('#diary-free').is(":checked")
    if(render.getPreviousPage() > 0){
        $.get(`recipes/${ingredient}?page=${render.getPreviousPage()}&limit=${LIMTIT_PER_PAGE}
            &glutenFree=${isGlutenFree}&diaryFree=${isDiaryFree}`,function(recipes){
            render.recipesRender(recipes)
            render.decrementCurrentPage()
        })
    }

})