(function() {

    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                display: grid;
                grid-row-gap: 5px;
                grid-template-columns: 1fr auto 1fr;
            }
            ::slotted(*) {
                grid-column-start: 2;
                grid-column-end: span 1;
            }
            .grid-item-2 {
                grid-column-start: 2;
                grid-column-end: span 1;
            }
            .nav-container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-template-rows: 1fr;
                justify-self: center;
            }
            .flex-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            
        </style>
        <slot name="voicemail"></slot>
        <div class="grid-item-2 flex-container">
            <p id="prev" class="nav-1"><a href="#" onclick="return false;">&lt;prev</a></p>
            <select is="c-pageselector" id="pageselector">select a page</select>
            <p id="next" class="nav-3"><a href="#" onclick="return false;">next&gt;</a></p>
        </div>
    `;

    class VoicemailList extends HTMLElement {


        static get observedAttributes() {
            return['pagenumber', 'numpages'];
        }


        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this._onDelete = this._onDelete.bind(this);
            this._onRead = this._onRead.bind(this);
            this._attachVoicemail = this._attachVoicemail.bind(this);

            this.voicemailSlot = this.shadowRoot.querySelector('slot[name=voicemail]');
            this.voicemailSlot.addEventListener('selectVoicemail', this.onSelectVoicemail);

            //bind prev and next event handlers to this element
            this._prev = this._prev.bind(this);
            this._next  = this._next.bind(this);
        }


        //On creation the component should get the messages from the server
        //this uses the fetch api
        connectedCallback() {
            //this._getVoicemail();

            //add events listeners to the next and prev buttons
            this.shadowRoot.getElementById('prev').addEventListener('click', this._prev);
            this.shadowRoot.getElementById('next').addEventListener('click', this._next);
            //this._fetchVoicemail('http://localhost:3000/messages', {}, this._attachVoicemail);
            //this._fetchVoicemail();
            this.addEventListener('pagechange', this._updatePage);
            
            //subscribe to the event bus
            //eventBus.subscribe('delete', this._onSubscribe);
        }

        attributeChangedCallback(name, oldVal, newVal) {
            //if the page number changes remove all the voicemail elements and fetch the new ones
            console.log('here');
            if(name === 'pagenumber') {
                console.log('page number changed');
                //this._removeVoicemail();
                this._getVoicemail();

                let pageselector = this.shadowRoot.getElementById('pageselector');
                pageselector.pagenumber = this.pagenumber;
            }

            if(name === 'numpages') {
                let pageselector = this.shadowRoot.getElementById('pageselector');
                pageselector.numpages = this.numpages;
                console.log('change number of pages');
            }
        }

        _fetchVoicemail(url, options, handler) {
            fetch(url, options)
                .then(this._checkStatus)
                .then(this._json)
                .then(handler)
                .catch(function(err) {
                    console.log('Fetch error: ', err);
                });
        }

        _updatePage(e) {
            console.log('page change event from the list');
            this.pagenumber = e.detail.page;

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
            console.log(response);
            return response.json();
        }

        //delete event handler
        _onDelete() {
            console.log('The delete button has been pressed');
            this._deleteVoicemail();
        }

        _onRead() {
            // check the read of the first element in the array
            // get an array of the nodes that share this value
            // update these attributes and update the server
            // unselect the voicemails
            var selectedVoicemail = document.querySelectorAll("c-voicemail[selected]");
            console.log(selectedVoicemail);
            var toUpdate = [];
            if(selectedVoicemail.length > 0) {
                var read = selectedVoicemail[0].hasAttribute('read');
            }
            selectedVoicemail.forEach(function(node) {
                if(node.read === read) {
                    toUpdate.push(node.id);
                    node.read = !node.read;
                }
                node.selected = !node.selected;
            });
            console.log(toUpdate);
            console.log(read);



            console.log('The read button has been pressed');
            let url = 'http://localhost:3000/messages';
            var options = {
                method : 'PUT',
                headers : {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body : JSON.stringify({
                    read : read,
                    list : toUpdate
                })
            }
            //this._readVoicemail();
            this._fetchVoicemail(url, options, this._readVoicemail);
        }

        _readVoicemail() {
            console.log('success');
        }


        _removeVoicemail() {
            var allVoicemail = document.querySelectorAll("c-voicemail");
            allVoicemail.forEach((node) => {
                node.remove();
            });
        }

        _attachVoicemail(data) {
            this._removeVoicemail();
            var objData = JSON.parse(data);
            console.log(objData);
            console.log(objData.count);
            this.numpages = Math.ceil(parseInt(objData.count) / parseInt(this.getAttribute('itemsPerPage')));
            console.log(this.numpages);
            for(let i = 0; i < objData.messages.length; i++) {
                let newVoicemail = document.createElement('c-voicemail');
                newVoicemail.setAttribute("slot", "voicemail");
                newVoicemail.id = objData.messages[i].uuid;
                newVoicemail.read = Boolean(objData.messages[i].seen);
                newVoicemail.date = objData.messages[i].date;

                //caller id element
                let callerElement = document.createElement('span');
                let callerText = document.createTextNode(objData.messages[i].callerid);
                callerElement.appendChild(callerText);
                newVoicemail.appendChild(callerElement);

                //<p> element inserted into the voicemail <slot> element
                let transcriptElement = document.createElement('p');
                transcriptElement.setAttribute("slot", "transcript");
                let transcriptText = document.createTextNode("Text inserted by the list element");
                transcriptElement.appendChild(transcriptText);
                newVoicemail.appendChild(transcriptElement);

                this.appendChild(newVoicemail);
            }
            console.log(typeof objData.messages);

        }

        _getVoicemail() {
            //adds the page number and the number of items per page to the url to recieve the required voicemails
            var url = 'http://localhost:3000/messages' + '?pageNumber=' + this.pagenumber.toString() + '&itemsPerPage=' + this.itemsPerPage.toString();
            this._fetchVoicemail(url, {}, this._attachVoicemail);
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

        _prev() {
            if(this.pagenumber > 1) {
                this.pagenumber = this.pagenumber - 1;
            }
        }

        _next() {
            if(this.pagenumber < this.numpages){
                this.pagenumber = parseInt(this.pagenumber) + 1;
            }
        }

        get numpages() {
            return this.getAttribute('numpages');
        }

        set numpages(value) {
            this.setAttribute('numpages', value);
        }

        /*get count() {
            return getAttribute('count');
        }

        set count(value) {
            this.setAttribute('count', value);
        }*/

        get pagenumber() {
            return this.getAttribute('pageNumber');
        }

        set pagenumber(value) {
            this.setAttribute('pageNumber', value);
        }

        get itemsPerPage() {
            return this.getAttribute('itemsPerPage');
        }

        set itemsPerPage(value) {
            this.setAttribute('itemsPerPage', value);
        }
    }

    customElements.define('c-voicemaillist', VoicemailList);
})();