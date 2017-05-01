var yelp = new YelpSearch();

function YelpSearch() {
	this.searchYelp = searchYelp;

	var keywordInput = document.getElementsByClassName('search-keyword__input')[0];
	var searchResults = document.getElementsByClassName('search-results__container')[0];

	function searchYelp(keywordStr, locationStr) {
		$.ajax({
	         url: "https://yelp-search.herokuapp.com/search",
	         method: "GET",
	         data: {
	         	term: keywordStr,
	         	location: locationStr
	        },
	         success: function(response) {
	             console.log(response);
	             var businesses = response.businesses;
	             displaySearchResults(businesses);
	         }

	    });
	}

	function displaySearchResults(response) {
		console.log(response);

		response.forEach(function(business) {
			var newDiv = "<div class='search-results__item'><a target='_blank' href='";
			newDiv += business.url + "'>";
			newDiv += business.name;
			newDiv += "</a>";

			searchResults.innerHTML += newDiv;
		});


		function newBusinessDiv () {				
		}

	}


}
