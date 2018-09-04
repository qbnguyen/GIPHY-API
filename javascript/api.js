//create var to hold animals in
var topic = ["cat", "dog", "skunk", "parrot"];
//lopp through array to display buttons
for (let j = 0; j < topic.length; j++) {
    var button = $("#gifButtons").append("<button>" + topic[j]);
    button.addClass("btn btn-success");
    // button.attr("id", "#animalButton");
    var animal = topic[j];

}
// topic.push($("#inputAnimal").val())
//connect buttons to api
$("button").on("click", function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var rating = $("<p>").text("Rating: " + results[i].rating);
            var imageUrl = results[i].images.fixed_height.url;
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalDiv.append(rating);
            animalDiv.append(animalImage);
            $("#gifDiv").prepend(animalDiv);
        }
    });

    //hide images from previous button selection



});