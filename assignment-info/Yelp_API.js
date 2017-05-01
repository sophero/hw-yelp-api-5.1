     $.ajax({
         url: "https://yelp-search.herokuapp.com/search",
         method: "GET",
         data: {
        },
         success: function(response){
             console.log(response)
         }

     })