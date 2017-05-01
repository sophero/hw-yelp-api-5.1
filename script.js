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

		response.forEach(function(business, index) {
			var newDiv = "<div class='search-results__item'>";
			// <div class='search-results__item__image'></div>
			var anchorTag = "<a target='_blank' href='";
			anchorTag += business.url + "'>";
			anchorTag += business.name;
			anchorTag += "</a>";

			var locationDiv = "<div class='search-results__item__location'>";
			locationDiv += business.location.address[0] + ', ' + business.location.city;

			newDiv += anchorTag + locationDiv + "</div>";

			searchResults.innerHTML += newDiv;
			
			

		});

		// response.forEach(function(business, index) {
		// 	var imageDiv = document.getElementsByClassName('search-results__item__image')[index];
		// 	console.log(business.image_url);
		// 	imageDiv.style.backgroundImage = business.image_url;
		// 	console.log(document.getElementsByClassName('search-results__item__image'));
			
		// 	console.log(imageDiv);

		// });


		function newBusinessDiv () {				
		}

	}


}
