/**
 * Created by Matuszewski on 14/03/16.
 */

var room_status = {
  rooms: [
    {
      room_id: '5919_60231',
      label: 'Flight Control Room',
      users: []
    },
    {
      room_id: '45287_53858',
      label: 'Sala Kongresowa',
      users: []
    },
    {
      room_id: '10344_31183',
      label: 'Carnegie Hall',
      users: []
    }
  ]
}

module.exports = function(){
  return room_status
}