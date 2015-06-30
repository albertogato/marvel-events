app.controller('EventoController', ['$scope', '$routeParams', 'APIMarvel', function($scope, $routeParams, APIMarvel) {
	var idEvento = $routeParams.id;

	$scope.evento = null;
	$scope.cargando = true;

	$scope.comics = [];
	$scope.cargandoComics = false;
	$scope.para = false;
	$scope.offset = 0;
	$scope.hayComics = false;

	// Leemos los datos del evento
	APIMarvel.leeEvento(idEvento).then(
		function(result) {
			$scope.evento = result.data.data.results[0];

			$('#evento').imagesLoaded().progress(function(imgLoad, image) {
				var $item = $( image.img ).parent();
				$item.removeClass('is-loading');
				if(!image.isLoaded) {
					$item.addClass('is-broken');
				}
			});

			for(var i in $scope.evento.comics.items) {
				var uriComic = $scope.evento.comics.items[i].resourceURI;
				var idComic = uriComic.substr(uriComic.lastIndexOf('/') + 1);
				$scope.evento.comics.items[i].idComic = idComic;
			}

			$scope.cargando = false;

			$('#evento').imagesLoaded().progress(function(imgLoad, image) {
				var $item = $( image.img ).parent();
				$item.removeClass('is-loading');
				if(!image.isLoaded) {
					$item.addClass('is-broken');
				}
			});
		},
		function() {
			$scope.cargando = false;
			alert('Error al acceder a la API de Marvel');
		}
	);

	// Leemos los cómics del evento (cargaComics es llamada por inifiniteScroll automáticamente)
	$scope.cargaComics = function() {
		if(!$scope.para && !$scope.cargandoComics) {
			$scope.cargandoComics = true;

			APIMarvel.leeComicsDeEvento(idEvento, $scope.offset).then(
				function(result) {
					var comics = result.data.data.results;
					if(comics.length > 0) {
						$scope.hayComics = true;
						$scope.comics.push.apply($scope.comics, comics);
						$scope.offset += comics.length;
					}
					else {
						$scope.para = true;
					}
					
					$scope.cargandoComics = false;
				},
				function() {
					$scope.cargandoComics = false;
					alert('Error al acceder a la API de Marvel');
				}
			);
		}
	};

}]);
