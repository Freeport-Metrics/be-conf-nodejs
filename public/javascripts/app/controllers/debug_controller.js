/**
 * Created by Matuszewski on 11/03/16.
 */
angular.module('beatconf.controllers')
    .controller('DebugController', function(
        $scope
    ){

      $scope.events = []

      $scope.socket = io.connect("http://beatconf-freeportmetrics.rhcloud.com:8000/", {
        multiplex: false
      });

      $scope.socket.on('user_connected', handleUserConnected);
      $scope.socket.on('user_disconnected', handleUserDisconnected);
      $scope.socket.on('connect', handleConnect);
      $scope.socket.on('room_status', handleRoomStatus)

      $scope.printDebug = printDebug;

      function handleUserDisconnected(client){
        $scope.printDebug('CLIENT DISCONNECTED', client, client)
      }

      function handleUserConnected(client){
        $scope.printDebug('NEW CLIENT CONNECTED', client, client)
      }

      function handleConnect(){
        $scope.printDebug('CLIENT CONNECTED', this.id, {})
      }

      function handleRoomStatus(data){
        $scope.printDebug('ROOM STATUS SENT', this.id, data)
      }

      function printDebug(event_name, data1, data2){
        $scope.$apply(function(){
          $scope.events.unshift({
            "event": event_name,
            "client_id": data1,
            "data": JSON.stringify(data2)
          })
        })
      }

    })