Dead simple event bus that can be used in Browsers and Node.js 

## Installation

Available via npm 
```bash 
npm install dead-simple-event-bus 
```

## Public API

It as 3 methods. 
- add()
- remove()
- trigger()

API can be used in 3 ways , namely
- Single event 
- Multiple events with args style 
- Multiple events with array style 

## Browser Setup 
```html
<script type="text/javascript" src="node_modules/dead-simple-event-bus/cli.js"></script>
<script type="text/javascript">
var ebSingle = new window.EventBus();
var ebArgsStyle = new window.EventBus();
var ebArrayStyle = new window.EventBus();
</script>
```

## node module 
```javascript
var EventBus = require('dead-simple-event-bus').EventBus;
var ebSingle = new EventBus();
var ebArgsStyle = new EventBus();
var ebArrayStyle = new EventBus();
```

### Single event 
```javascript
//event Bus with single event 
ebSingle.add('a' , function(a , b ){ console.log(a + ' ' + b ); });
ebSingle.trigger('a' , [ 1 , 2 ]);
ebSingle.remove('a' , function(a , b ){ console.log(a + ' ' + b ); } );
```
### Multiple events with args style 
```javascript 
ebArgsStyle.add('a' , function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); });
ebArgsStyle.trigger('a' , [ 1 , 2 ]);
ebArgsStyle.remove('a' , function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); });
```

### Multiple events with array style 
```javascript 
ebArrayStyle.add('a' ,[ function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); } ] );
ebArrayStyle.trigger('a' , [ 1 , 2 ]);
ebArrayStyle.remove('a' , [ function(a , b ){ console.log(a + ' ' + b ); } , function(a , b ){ console.log( b + ' ' + a  ); }]);
```

### Duplicate functions
__dead-simple-event-bus__ optimizes the event bus by not allowing more than one copy of function to be added.

```javascript 
ebSingle.add('a' , function(a , b ){ console.log(a + ' ' + b ); }); // assigns event 
ebSingle.add('a' , function(a , b ){ console.log(a + ' ' + b ); }); // avoids assigning and prints message
```
By default , duplicate functions print a message to console and doesn't get addedup again on the event bus. If you want to handle this manually , you could dig a bit into the source and insert a callback. 

### Contribution 
More than welcomed !

### License
![](https://raw.githubusercontent.com/scriptnull/bagpack/master/GPL.png)
