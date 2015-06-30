app.controller('EventosController', ['$scope', 'APIMarvel', function($scope, APIMarvel) {
	$scope.eventos = [];
	$scope.cargando = false;
	$scope.para = false;
	$scope.offset = 0;

	// cargaEventos lee un bloque de eventos, esta función es llamada por el infiniteScroll automáticamente cuando se hace scroll
	$scope.cargaEventos = function() {
		if(!$scope.para && !$scope.cargando) {
			$scope.cargando = true;

			APIMarvel.leeEventos($scope.offset).then(
				function(result) {
					var eventos = result.data.data.results;
					if(eventos.length > 0) {
						$scope.eventos.push.apply($scope.eventos, eventos);
						$scope.offset += eventos.length;
					}
					else {
						$scope.para = true;
					}
					$scope.cargando = false;
				},
				function() {
					alert('Error al acceder a la API de Marvel');
				}
			);
		}
	};
	
	// Cada 250ms comprobamos cuanto mide de alto la lista de eventos, ya que si se vuelve a /eventos desde otra ruta, el infiniteScroll deja de detecta el scroll correctamente
	function compruebaAlturaEventos() {
		var alturaListaEventos = $('#lista_eventos').height();
		var alturaPantalla = $(window).height();
		if(alturaListaEventos < alturaPantalla) {
			$scope.cargaEventos();
		}
		else {
			clearInterval(intervaloComprobacionAlturaEventos);
		}
	}
	var intervaloComprobacionAlturaEventos = setInterval(compruebaAlturaEventos, 250);
}]);
