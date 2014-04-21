Items = new Meteor.Collection('geotest');





if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to test.";
  };
  Template.hello.rendered = function () {


    var query = {
      located : {
        $near : {
          $geometry: {
            type : 'Point', 
            coordinates : [13.40613,52.41853]
          },
          $maxDistance : 5000
        }
      }
    };


    console.log('Items found (Before subscribe): ' + Items.find().count());
    // returns: 0
    Meteor.subscribe('geotest', query, function(){
      console.log('Items found (After subscribe WITHOUT query): ' + Items.find().count());
      // returns: 1
      console.log('Items found (After subscribe WITH query): ' + Items.find(query).count());
      // returns: 0
    });

    window.setTimeout(function(){
      console.log('Items found (After subscribe AND Timeout WITHOUT query: ' + Items.find().count());
      // returns 1

      console.log('Items found (After subscribe AND Timeout WITH query: ' + Items.find(query).count());
      // returns: 0

    }, 5000);


  };
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    Items._ensureIndex({'located':'2dsphere'});
  });



  Meteor.publish('geotest',function(query){
    return Items.find(query);
  });




  if (!Items.find().count()) {
    Items.insert({
      located : {
        lon : 13.4061300, 
        lat : 52.4185300
      }
    });
  }




}

