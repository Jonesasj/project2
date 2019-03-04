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
            this._attachVoicemail = this._attachVoicemail.bind(this);
        }

        

        //On creation the component should get the messages from the server
        //this uses the fetch api
        connectedCallback() {
            fetch('http://localhost:3000/messages')
                .then(this._checkStatus)
                .then(this._json)
                .then(this._attachVoicemail)
                .catch(function(err) {
                    console.log('Fetch error: ', err);
                });
            
            //subscribe to the event bus
            //eventBus.subscribe('delete', this._onSubscribe);


        }

        _checkStatus(response) {
            if(response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }

        _json(response) {
            return response.json();
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

        _attachVoicemail(data) {
            var objData = JSON.parse(data);
            console.log(objData);
            for(let i = 0; i < objData.length; i++) {
                let newVoicemail = document.createElement('c-voicemail');
                newVoicemail.setAttribute("slot", "voicemail");
                this.appendChild(newVoicemail);
            }
            console.log(typeof objData);

        }

        _getVoicemail() {

        }

        //makes a delete callout to the server
        _deleteVoicemail() {

        }
    }

    customElements.define('c-voicemaillist', VoicemailList);
})();