




function searchYelp(keywordStr, locationStr) {
	$.ajax({
         url: "https://yelp-search.herokuapp.com/search",
         method: "GET",
         data: {
         	term: keywordStr,
         	location: locationStr
        },
         success: function(response) {
             console.log(response)
         }

    });
}
    