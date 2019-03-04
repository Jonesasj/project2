(function() {

    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                display: block;
            }
            ::slotted(c-voicemail {
                color: blue;
            }
        </style>
        <slot name="voicemail"></slot>
    `;

    class VoicemailList extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this._onDelete = this._onDelete.bind(this);
            this._onRead = this._onRead.bind(this);
        }

        //On creation the component should get the messages from the server
        //this uses the fetch api
        connectedCallback() {
            fetch('http://localhost:3000/messages')
                .then(
                    function(response) {
                        if(response.status !== 200) {
                            throw new Error(response.statusText);
                        } else {
                            response.json().then(function(data) {
                                console.log(data);
                            });
                        }
                    }
                )
                .catch(function(err) {
                    console.log('Fetch error: ', err);
                });
            
            //subscribe to the event bus
            //eventBus.subscribe('delete', this._onSubscribe);


        }

        //delete event handler
        _onDelete() {
            console.log('The delete button has been pressed');
        }

        _onRead() {
            console.log('The read button has been pressed');
        }


        _removeVoicemail() {

        }

        _attachVoicemail() {

        }

        _getVoicemail() {

        }

        //makes a delete callout to the server
        _deleteVoicemail() {

        }
    }

    customElements.define('c-voicemaillist', VoicemailList);
})();