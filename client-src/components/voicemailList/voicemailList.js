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
            //this._onRead = this._onRead.bind(this);
            this._attachVoicemail = this._attachVoicemail.bind(this);

            this.voicemailSlot = this.shadowRoot.querySelector('slot[name=voicemail]');
            this.voicemailSlot.addEventListener('selectVoicemail', this.onSelectVoicemail);
        }


        //On creation the component should get the messages from the server
        //this uses the fetch api
        connectedCallback() {
            this._fetchVoicemail('http://localhost:3000/messages', {}, this._attachVoicemail);
            //this._fetchVoicemail();
            
            //subscribe to the event bus
            //eventBus.subscribe('delete', this._onSubscribe);
        }

        _fetchVoicemail(url, options, handler) {
            fetch(url)
                .then(this._checkStatus)
                .then(this._json)
                .then(handler)
                .catch(function(err) {
                    console.log('Fetch error: ', err);
                });
        }

        onSelectVoicemail(event) {
            console.log('pressed from the list');
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
            this._deleteVoicemail();
        }

        /*_onRead() {
            var selectedVoicemail = document.querySelectorAll("c-voicemail[selected]");

            console.log('The read button has been pressed');
            var url = 'http://localhost:3000/messages';
            var options = {
                method : 'put',
                headers : {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body : {
                    job : 
                }
            }
            this._readVoicemail();
        }*/

        _readVoicemail() {
            
        }


        _removeVoicemail() {

        }

        _attachVoicemail(data) {
            var objData = JSON.parse(data);
            console.log(objData);
            for(let i = 0; i < objData.length; i++) {
                let newVoicemail = document.createElement('c-voicemail');
                newVoicemail.setAttribute("slot", "voicemail");

                let transcriptElement = document.createElement('p');
                transcriptElement.setAttribute("slot", "transcript");
                let transcriptText = document.createTextNode("Text inserted by the list element");
                transcriptElement.appendChild(transcriptText);
                newVoicemail.appendChild(transcriptElement);

                this.appendChild(newVoicemail);
            }
            console.log(typeof objData);

        }

        _getVoicemail() {

        }

        //removes all the voicemails and makes a request for the new ones
        _render() {

        }



        //makes a delete callout to the server
        _deleteVoicemail() {
            //get the selected voicemails
            var selectedVoicemail = document.querySelectorAll("c-voicemail[selected]");
            selectedVoicemail.forEach(function(node) {
                node.remove();
            });

        }
    }

    customElements.define('c-voicemaillist', VoicemailList);
})();