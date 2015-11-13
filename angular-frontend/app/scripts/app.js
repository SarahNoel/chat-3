(function () {
   'use strict';
}());

var app = angular.module('chatApp', [
                          'ngCookies',
                          'ngResource',
                          'ngSanitize',
                          'btford.socket-io'
                        ]).value('nickName', 'anonymous');
