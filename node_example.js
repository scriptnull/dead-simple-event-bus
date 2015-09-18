var EventBus = require('./index.js').EventBus;
//create event bus => gives a private eventBusCore.
var ebSingle = new EventBus();
var ebArgsStyle = new EventBus();
var ebArrayStyle = new EventBus();

//event Bus with single event 
ebSingle.add('a' , function(a , b ){ console.log(a + ' ' + b ); });
ebSingle.trigger('a' , [ 1 , 2 ]);
ebSingle.remove('a' , function(a , b ){ console.log(a + ' ' + b ); } );

//event Bus with multiple events

//args style 
ebArgsStyle.add('a' , function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); });
ebArgsStyle.trigger('a' , [ 1 , 2 ]);
ebArgsStyle.remove('a' , function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); });

//array style 
ebArrayStyle.add('a' , [ function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); } ] );
ebArrayStyle.trigger('a' , [ 1 , 2 ]);
ebArrayStyle.remove('a' , [ function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); }]);