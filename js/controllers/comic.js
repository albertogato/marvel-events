app.controller('ComicController', ['$scope', '$routeParams', 'APIMarvel', function($scope, $routeParams, APIMarvel) {
	var idComic = $routeParams.id;

	$scope.comic = {};
	$scope.cargando = true;

	// Leemos los datos del cómic
	APIMarvel.leeComic(idComic).then(
		function(result) {
			$scope.comic = result.data.data.results[0];

			$scope.cargando = false;
			
			$('#comic').imagesLoaded().progress(function(imgLoad, image) {
				var $item = $( image.img ).parent();
				$item.removeClass('is-loading');
				if(!image.isLoaded) {
					$item.addClass('is-broken');
				}
			});
		},
		function() {
			alert('Error al acceder a la API de Marvel');
			$scope.cargando = false;
		}
	);
}]);
