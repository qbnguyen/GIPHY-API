//create var to hold animals in
var topic = ["cat", "dog", "skunk", "parrot"];
//loop through array to display buttons
function createButtons(){
    $("#gifButtons").empty();
    for (let j = 0; j < topic.length; j++) {
        var button = $("<button>" + topic[j] + "</button>");
        button.addClass("btn btn-success animalButtons");
        $("#gifButtons").append(button);
       
    } 
}
// topic.push($("#inputAnimal").val())
//connect buttons to api
$("#gifButtons").on("click", ".animalButtons", function () {
    var animal= $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        console.log(response);
        $("#gifDiv").empty();
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var rating = $("<p>").text("Rating: " + results[i].rating);
            var imageUrl = results[i].images.fixed_height.url;
            var animalImage = $("<img>");
            animalImage.addClass("animalClass");
            animalImage.attr("data-animate", imageUrl);
            animalImage.attr("data-still",results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalDiv.append(rating);
            animalDiv.append(animalImage);
            $("#gifDiv").prepend(animalDiv);
        }
    });

});

$(document).on("click", ".animalClass", function(){
    var state= $(this).attr("data-state");
    console.log(state)
    if (state === "still"){
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate );
        $(this).attr("data-state", "animate");
    }
    else{
        var still = $(this).attr("data-still");
        $(this).attr("src", still );
        $(this).attr("data-state", "still");
    }

});

$("#formButton").on("click", function(){
    event.preventDefault();
    var userInput= $("input").val().trim();
    if (topic.indexOf(userInput) > -1){
        console.log ("already in array");
    }
    else{
        topic.push(userInput);
    }
   $("input").val("");
   createButtons();
});

createButtons();