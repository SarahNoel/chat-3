(function () {
   'use strict';
}());


app.controller('SocketCtrl', ['$http','$scope', 'chatSocket', 'messageFormatter', 'nickName', function ($http, $scope, chatSocket, messageFormatter, nickName) {

  $http.get('/api/test').
  then(function(data){
    console.log("testttt");
    console.log(data);
  });
  $scope.nickName = nickName;
  $scope.messageLog = 'Ready to chat!';


  $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)');

    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
      var oldNick = nickName;
      nickName = match[1];
      $scope.message = '';
      $scope.messageLog = messageFormatter(new Date(),
                      nickName, 'nickname changed - from ' +
                        oldNick + ' to ' + nickName + '!') + $scope.messageLog;
      $scope.nickName = nickName;
    }

    chatSocket.emit('message', nickName, $scope.message);
    $scope.message = '';
  };

  $scope.$on('socket:broadcast', function(event, data) {
    if (!data.payload) {
      console.log(error('invalid message', 'event', event, 'data', JSON.stringify(data)));
      return;
    }
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
    });
  });
}]);
