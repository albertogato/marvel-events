app.controller('InicioController', ['$scope', 'APIMarvel', function($scope, APIMarvel) {
	$scope.eventoDestacado = null;
	$scope.eventosRecientes = [];
	$scope.comicsRecientes = [];
	$scope.cargandoEventos = true;
	$scope.cargandoComics = true;

	// Leemos los eventos destacados
	APIMarvel.leeEventos(0).then(
		function(result) {
			var eventos = result.data.data.results;
			if(eventos.length > 1) {
				$scope.eventosRecientes.push.apply($scope.eventosRecientes, eventos);
				
				// Cogemos el segundo evento como destadado (porque Marvel pone Avengers Now! del año 2037 como primero... El segundo debería ser el más reciente)
				$scope.eventoDestacado = eventos[1];

				$('#evento_destacado').imagesLoaded().progress(function(imgLoad, image) {
					var $item = $( image.img ).parent();
					$item.removeClass('is-loading');
					if(!image.isLoaded) {
						$item.addClass('is-broken');
					}
				});
			}
			$scope.cargandoEventos = false;
		},
		function() {
			$scope.cargandoEventos = false;
			alert('Error al acceder a la API de Marvel');
		}
	);

	// Leemos los 8 comics más recientes
	APIMarvel.leeComicsRecientes(8).then(
		function(result) {
			var comics = result.data.data.results;
			if(comics.length > 0) {
				$scope.comicsRecientes.push.apply($scope.comicsRecientes, comics);
			}
			$scope.cargandoComics = false;
		},
		function() {
			alert('Error al acceder a la API de Marvel');
			$scope.cargandoComics = false;
		}
	);
}]);
