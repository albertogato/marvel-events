app.factory('APIMarvel', ['$http', '$q', function($http, $q) {
	var apiKey = '96443e79ac26bd7094d073927988747b';
	var APIMarvel = {};
	
	APIMarvel.leeEventos = function(offset) {
		var url = 'http://gateway.marvel.com:80/v1/public/events?&orderBy=-startDate&limit=4&offset=' + offset + '&apikey=' + apiKey;
		return $http.get(url, { cache: true });
	};

	APIMarvel.leeEvento = function(idEvento) {
		var url = 'http://gateway.marvel.com:80/v1/public/events/' + idEvento + '?apikey=' + apiKey;
		return $http.get(url, { cache: true });
	};

	APIMarvel.leeComic = function(idComic) {
		var url = 'http://gateway.marvel.com:80/v1/public/comics/' + idComic + '?apikey=' + apiKey;
		return $http.get(url, { cache: true });
	};

	APIMarvel.leeComicsDeEvento = function(idEvento, offset) {
		var url = 'http://gateway.marvel.com:80/v1/public/events/' + idEvento + '/comics?orderBy=onsaleDate&limit=4&offset=' + offset + '&apikey=' + apiKey;
		return $http.get(url, { cache: true });
	};

	APIMarvel.leeComicsRecientes = function(limit) {
		var url = 'http://gateway.marvel.com:80/v1/public/comics?orderBy=-onsaleDate&limit=' + limit + '&offset=0&apikey=' + apiKey;
		return $http.get(url, { cache: true });
	};

	return APIMarvel;
}]);