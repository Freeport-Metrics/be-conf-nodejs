/**
 * Created by Matuszewski on 10/03/16.
 */

// THIS FILE CONTAINS DEFAULT BEACON CONFIG
/*
In future we should think about moving this config to database and add some interface
for configuration
b_id : Major_minor numbers of beacon
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
        b_id: '5919_60231',
        label: 'Flight Control Room',
        room_radius: 4.0,
      },
      {
        b_id: '45287_53858',
        label: 'Sala Konferencyjna',
        room_radius: 3.0,
      },
      {
        b_id: '10344_31183',
        label: 'Carnegie Hall',
        room_radius: 2.0,
      }
    ]
  }
}