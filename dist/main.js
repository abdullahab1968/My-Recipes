

$('#search-button').on('click', function(){
    let ingredient = $('#search-input').val()
    $.ajax({
        url: `recipes/${ingredient}`,
        method: "GET",
        success: function (response) {
            console.log("GET completed")
        }
    })
})