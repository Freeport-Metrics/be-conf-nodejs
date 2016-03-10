/**
 * Created by Matuszewski on 10/03/16.
 */


// THIS FILE CONTAINS DEFAULT BEACON CONFIG
/*
In future we should think about moving this config to database and add some interface
for configuration
 */
/*
 {
 [
 {
 b_id: 1312312312312,
 room_radius: 4
 },
 {
 b_id: 2354336373634,
 room_radius: 3
 },
 {
 b_id: 2935283682358,
 room_radius: 2
 }
 ]
 }
 */

module.exports = function(){
  return {
    config: [
      {
        b_id: 1312312312312,
        label: 'Konferencyjna 1',
        room_radius: 4,
      },
      {
        b_id: 1312312312313,
        label: 'Konferencyjna 2',
        room_radius: 3,
      },
      {
        b_id: 1312312312314,
        label: 'Konferencyjna 3',
        room_radius: 2,
      }
    ]
  }
}