var eventBus = (function() {
    var registry = {}

    return {
        //adds an event to the registry
        subscribe : function(topic, handler) {
            //if the topic exists add the handler to the array. If it doesn't, create it.
            if(registry.hasOwnProperty(topic)) {
                registry[topic].push(handler);
            } else {
                registry[topic] = [handler];
            }

            console.log(topic);
            console.log('from the eventbus');
        },

        //Execute all of the hanlders for a given topic
        publish : function(topic) {
            if(registry.hasOwnProperty(topic)) {
                handlers = registry[topic];
                for(i = 0; i < handlers.length; i++) {
                    handlers[i]();
                }
            }
        }
    }

})();

//registry looks like
/*
    registry = {
        topic [
            {
                name : 'delete',
                subscriberCallbacks : [
                    callback functions go here
                ]
            },
            {
                name : 'someEvent',
                subscriberCallbacks : [

                ]
            }
        ]
    }
    OR
    topics = {
        delete : [array of callbacks],
        update : [array of callbacks]
    }


*/