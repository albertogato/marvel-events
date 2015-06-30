var app = angular.module('marvelApp', ['ngRoute', 'ngAnimate', 'infinite-scroll']);

app.config(function($routeProvider) {
	var basePartials = 'js/partials/';
	$routeProvider
		.when('/', {
			controller: 'InicioController',
			templateUrl: basePartials + 'inicio.html'
		})
		.when('/eventos', {
			controller: 'EventosController',
			templateUrl: basePartials + 'eventos.html'
		})
		.when('/evento/:id', {
			controller: 'EventoController',
			templateUrl: basePartials + 'evento.html'
		})
		.when('/comic/:id', {
			controller: 'ComicController',
			templateUrl: basePartials + 'comic.html'
		})
		.otherwise({ redirectTo: '/'});
});

// Definimos un filtor para formatear las fechas
app.filter('fecha', function() {
	return function(fecha) {
		var anho = fecha.substr(0, 4);
		var mes = fecha.substr(5, 2);
		var dia = fecha.substr(8, 2);

		return dia + '/' + mes + '/' + anho;
	};
});
