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
        $scope.printDebug('NEW CLIENT CONNECTED', JSON.stringify(this.id), JSON.stringify(client))
      }

      function handleConnect(){
        $scope.printDebug('CLIENT CONNECTED', JSON.stringify(this.id), JSON.stringify({}))
      }

      function handleConfig(data){
        $scope.printDebug('CONFIG SENT', JSON.stringify(this.id), JSON.stringify(data))
      }

      function handleRoomStatus(data){
        $scope.printDebug('ROOM STATUS SENT', JSON.stringify(this.id), JSON.stringify(data))
      }

      function handleDisconnect(data){
        $scope.printDebug('CLIENT DISCONNECTED', JSON.stringify(this.id), JSON.stringify(data))
      }

      function handleEnterRoom(data){
        $scope.printDebug('USER ENTERED ROOM', JSON.stringify(this.id), JSON.stringify(data))
      }

      function handleLeaveRoom(data){
        $scope.printDebug('USER LEFT ROOM', JSON.stringify(this.id), JSON.stringify(data))
      }

      function printDebug(event_name, data1, data2){
        $scope.$apply(function(){
          $scope.events.push('================')
          $scope.events.push(event_name)
          $scope.events.push(data1)
          $scope.events.push(data2)
          $scope.events.push('================')
        })

      }

    })