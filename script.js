$(document).ready(function() {

	var yelp = new YelpSearch();

	function YelpSearch() {
		this.searchYelp = searchYelp;

		var keywordInput = document.getElementsByClassName('keyword-input')[0];
		var searchBtn = document.getElementsByClassName('initiate-search-btn')[0];
		var searchResults = document.getElementsByClassName('search-results__container')[0];
		var searchedFor = document.getElementsByClassName('searched-for__container')[0];
		var searchedForKeywords = document.getElementsByClassName('searched-for__keywords')[0];
		var searchedForLocation = document.getElementsByClassName('searched-for__location')[0];
		var dropdownSelectedItem = document.getElementsByClassName('location-dropdown-menu__selected')[0];
		var dropdownMenu = document.getElementsByClassName('location-dropdown-menu__container')[0];
		var showDropdownMenuBtn = document.getElementsByClassName('location-dropdown-menu__show-menu-btn')[0];
		var dropdownMenuItems = document.getElementsByClassName('location-dropdown-menu__item');

		searchBtn.addEventListener("click", initiateSearch);
		showDropdownMenuBtn.addEventListener("click", toggleDropdownMenu);
		searchResults.addEventListener("click", hideDropdownMenu);

		keywordInput.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				initiateSearch();
			}
		});

		document.addEventListener("keyup", function() {
			if (event.keyCode === 27) {
				hideDropdownMenu();
			}
		});

		for (let k = 0; k < dropdownMenuItems.length; k++) {
			dropdownMenuItems[k].addEventListener("click", function() {
				dropdownSelectedItem.innerHTML = dropdownMenuItems[k].innerHTML;
				toggleDropdownMenu();
				keywordInput.focus();
			});
		}

		keywordInput.focus();


		function initiateSearch() {
			var keywordStr = keywordInput.value;
			var locationStr = dropdownSelectedItem.innerHTML;
			
			keywordInput.value = "";

			searchResults.innerHTML = "";		
			searchYelp(keywordStr, locationStr);

			searchedFor.style.display = "block";
			searchedForKeywords.innerHTML = keywordStr;
			searchedForLocation.innerHTML = locationStr;
		}

		function searchYelp(keywordStr, locationStr) {
			$.ajax({
		        url: "https://yelp-search.herokuapp.com/search",
		        method: "GET",
		        data: {
		        	term: keywordStr,
		        	location: locationStr
		    	},
		        success: function(response) {
		            var businesses = response.businesses;
		            displaySearchResults(businesses);
		        }
		    });
		}

		function displaySearchResults(response) {

			response.forEach(function(business, index) {
				var newDiv = "<div class='search-results__item'>";

				var anchorTag = "<a target='_blank' href='";
				anchorTag += business.url + "'>";
				anchorTag += business.name;
				anchorTag += "</a>";

				var locationDiv = "<div class='search-results__item__location'>";
				locationDiv += business.location.address[0] + ', ' + business.location.city;

				newDiv += anchorTag + locationDiv + "</div>";

				searchResults.innerHTML += newDiv;
				
			});
		}

		function toggleDropdownMenu() {
			dropdownMenu.classList.toggle('show-menu');		
		}

		function hideDropdownMenu() {
			dropdownMenu.classList.remove('show-menu');
		}
	}

});