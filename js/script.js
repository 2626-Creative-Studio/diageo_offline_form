var app = angular.module('offline-form', ['ngStorage']);

app.controller('formCtrl', function ($scope, $localStorage) {
	console.log('forms working...');

	var appCache = window.applicationCache;

	switch (appCache.status) {
		case appCache.UNCACHED: // UNCACHED == 0
			console.log('UNCACHED');
			break;
		case appCache.IDLE: // IDLE == 1
			console.log('IDLE');
			break;
		case appCache.CHECKING: // CHECKING == 2
			console.log('CHECKING');
			break;
		case appCache.DOWNLOADING: // DOWNLOADING == 3
			console.log('DOWNLOADING');
			break;
		case appCache.UPDATEREADY:  // UPDATEREADY == 4
			console.log('UPDATEREADY');
			break;
		case appCache.OBSOLETE: // OBSOLETE == 5
			console.log('OBSOLETE');
			break;
		default:
			console.log('UKNOWN CACHE STATUS');
			break;
	};

	$scope.user = {};

	$scope.formSubmit = function (user) {
		console.log(user);
		if ($localStorage.users) {
			$localStorage.users.push(user);
		} else {
			$localStorage.users = [user];
		}
		$scope.user = {};

		$("#myModal").modal();

		setTimeout(function () {
			$("#myModal").modal("hide");
		}, 1000);
	}

});

app.controller('dataCtrl', function ($scope, $localStorage) {
	$scope.users = $localStorage.users;

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCLmSJkZ3xTVPyo1EyZrf7c8HxHy2aSzvg",
		authDomain: "offline-form-6101c.firebaseapp.com",
		databaseURL: "https://offline-form-6101c.firebaseio.com",
		projectId: "offline-form-6101c",
		storageBucket: "offline-form-6101c.appspot.com",
		messagingSenderId: "737124345462"
	};
	firebase.initializeApp(config);

	// Get a reference to the database service
	//var database = firebase.database().ref().child('object');
	var database = firebase.database().ref('users');

	//console.log(firebase.database().ref().child('users'))

	$scope.download = function () {
		console.log($scope.users[0]);
		//database.push().set({});
		//database.push().set($scope.users[0]);
		angular.forEach($scope.users, function (val, indx) {
			console.log(JSON.stringify(val));
			database.push().set({
				name: val.name,						  
				email: val.email,
				city: val.city,
				phone: val.phone_no,
				selectedPackage: val.selectedPackage,
			});
		});

		$("#myModal").modal();
		setTimeout(function () {
			$("#myModal").modal("hide");
		}, 1000);

		//database.on('value', snap => console.log(snap.val()));
	}
});