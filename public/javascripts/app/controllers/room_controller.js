/**
 * Created by Matuszewski on 11/03/16.
 */
angular.module('beatconf.controllers')
    .controller('RoomController', function(
        $scope
    ){
        $scope.room_status = [];

        $scope.socket = io.connect("http://beatconf-freeportmetrics.rhcloud.com:8000/", {
            multiplex: false
        });

        $scope.socket.on('room_status', handleRoomStatus)
        $scope.isRoomFree = isRoomFree;

        function handleRoomStatus(data){
            $scope.$apply(function(){
                $scope.room_status = data.rooms;
            })
        }

        function isRoomFree(room){
            return room.users.length == 0
        }

    })