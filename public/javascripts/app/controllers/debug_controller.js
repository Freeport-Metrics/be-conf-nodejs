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

      $scope.socket.on('user_connected', handleUserConnected)
      $scope.socket.on('connect', handleConnect)
      $scope.socket.on('config', handleConfig)
      $scope.socket.on('room_status', handleRoomStatus)
      $scope.socket.on('disconnect', handleDisconnect)
      $scope.socket.on('enterRoom', handleEnterRoom);
      $scope.socket.on('leaveRoom', handleLeaveRoom);

      $scope.printDebug = printDebug;

      function handleUserConnected(client){
        $scope.printDebug('NEW CLIENT CONNECTED', client, client)
      }

      function handleConnect(){
        $scope.printDebug('CLIENT CONNECTED', this.id, {})
      }

      function handleConfig(data){
        $scope.printDebug('CONFIG SENT', this.id, data)
      }

      function handleRoomStatus(data){
        $scope.printDebug('ROOM STATUS SENT', this.id, data)
      }

      function handleDisconnect(data){
        $scope.printDebug('CLIENT DISCONNECTED', this.id, data)
      }

      function handleEnterRoom(data){
        $scope.printDebug('USER ENTERED ROOM', this.id, data)
      }

      function handleLeaveRoom(data){
        $scope.printDebug('USER LEFT ROOM', this.id, data)
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