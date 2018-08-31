$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(queryURL);
  
            console.log(response);
          });
        })