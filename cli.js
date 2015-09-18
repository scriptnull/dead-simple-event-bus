window.EventBus = function () {
	var eventBusCore = [];	
	var areFuncEqual = function (a, b) {
		return a.toString() == b.toString();
	};
	var isFuncInFuncArr = function (arr, func) {
		for(var z = 0 ; z < arr.length ; z++){
			if(areFuncEqual(arr[z] , func)) return true;
		}
		return false;
	};
	var isKeyValueObjInArr = function (arr, key, val) {
		var filteredArr = arr.filter(function (entry) {
			return entry[key] === val;
		});
		return filteredArr.length > 0;
	};
	var removeFuncInFuncArr = function (arr, fn) {
		for(var z = 0 ; z <  arr.length ; z++){
			if(areFuncEqual(arr[z] , fn)) arr.splice(z , 1);
		}
		return arr;
	};
	var getKeyValueObjInArr = function (arr, key, val) {
		var filteredArr = arr.filter(function (entry) {
			return entry[key] === val;
		});
		return filteredArr[0];
	};
	var _addEvent = function (eventName, eventFunc) {
		if (!isKeyValueObjInArr(eventBusCore, 'eventName', eventName)) {
			eventBusCore.push({ eventName: eventName, eventFuncArr: [eventFunc] });
		} else {
			eventBusCore = eventBusCore.map(function(event){
				if(event['eventName'] == eventName){
					if (!isFuncInFuncArr(event.eventFuncArr , eventFunc)) {
						event.eventFuncArr.push(eventFunc);
					}
					else console.log('event bus optimized by ignoring already exising function');
				}
				return event;
			});
		}
	}
	this.add = function (eventName, callbacks) {
		if (!eventName) return;
		if (typeof (callbacks) == 'function') {
			for(var i = 1 ; i < arguments.length ; i++){
				_addEvent(eventName, arguments[i]);	
			}
		}
		if (typeof (callbacks) == 'object' && callbacks.forEach) {
			callbacks.forEach(function (fn) {
				_addEvent(eventName, fn);
			});
		}
	};
	this.remove = function (eventName, callbacks) {
		if (!eventName) return;
		for (var i = 0; i < eventBusCore.length; i++) {
			if (eventBusCore[i].eventName == eventName) {
				if(arguments.length == 1 ){
					return eventBusCore.splice(i , 1 );
				}
				var removedEvent = eventBusCore.splice(i, 1)[0];
				if (typeof (callbacks) == 'function') {
					for(var k = 1 ; k < arguments.length ; k++){
						removedEvent.eventFuncArr = removeFuncInFuncArr(removedEvent.eventFuncArr, arguments[k]);	
					}
				}
				if (typeof (callbacks) == 'object' && callbacks.length) {
					for(var x = 0 ; x < callbacks.length ; x++ ){
						removedEvent.eventFuncArr = removeFuncInFuncArr(removedEvent.eventFuncArr, callbacks[x]);
					}
				}
				eventBusCore.push(removedEvent);
			}
		}
	};
	this.trigger = function (eventName, data) {
		var event = getKeyValueObjInArr(eventBusCore , 'eventName' , eventName);
		( event.eventFuncArr || [] ).forEach(function(fn){
			fn.apply(this, data);
		});
	};
};