(function() {

    //I'll change this when I find out how to
    const template = document.createElement('template');
    template.innerHTML = `
                        <style>
                            :host {
                                display: block;
                                font-weight: bold;
                            }
                            :host([read]){
                                color: grey;
                                font-weight: normal;
                            }
                            .grid-container {
                                display: grid;
                                grid-template-columns: 30px 70px 300px 150px 100px;
                                grid-column-gap: 10px;
                                border: 2px solid #000;
                                justify-content: center;
                            }
                            .item {
                                justify-self: center;
                                align-self: center;
                            }

                            .grid-item-b {
                                align-self: start;
                            }

                            p {
                                padding: 0px;
                            }


                        </style>
                        <div class="grid-container">
                            <input class="grid-item-a item" type="checkbox" name="selected">
                            <div class="grid-item-b item">
                                <p>Called id</p>
                                <slot>Caller Unknown</slot>
                            </div>
                            <audio controls class="grid-item-c item" id="audio" preload="none">
                                <source type="audio/wav" id="source">
                            </audio>
                            <slot name="transcript" class="grid-item-d item"></slot>
                            <div class="grid-item-e item">
                                <time></time>
                            </div> 
                        </div>

                        
    `;

    let voicemailCounter = 0;


    class Voicemail extends HTMLElement {

        static get observedAttributes() {
            return ['selected', 'read'];
        }


        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this._toggleSelected = this._toggleSelected.bind(this);

        }

        connectedCallback() {
            this.shadowRoot.querySelector('input').addEventListener('click', this._toggleSelected);

            //enter the date
            let timeElement = this.shadowRoot.querySelector('time');
            let timeText = document.createTextNode(this.date);
            timeElement.setAttribute('datetime', this.date);
            timeElement.appendChild(timeText);

            //set the source address for the audio element
            let source = this.shadowRoot.getElementById('source');
            source.setAttribute('src', 'http://localhost:3000/messages/' + this.id);
            console.log(source);

        }

        attributeChangedCallback(name, oldVal, newVal) {
            //when selected changes set check on the checkbox fire a click event on 
            if(name === 'selected') {
                let checkbox = this.shadowRoot.querySelector('input');
                if(this.selected) {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            }
        }

        set date(value) {
            this.setAttribute('date', value);
        }

        get date() {
            return this.getAttribute('date');
        }


        set selected(value) {

            const isSelected = Boolean(value);
            if (isSelected) {
                this.setAttribute('selected', '');
            } else {
                this.removeAttribute('selected');
            }
        }

        get selected() {
            return this.hasAttribute('selected');
        }

        set read(value) {
            const isRead = Boolean(value);
            if (isRead) {
                this.setAttribute('read', '');
            } else {
                this.removeAttribute('read');
            }
        }

        get read() {
            return this.hasAttribute('read');
        }

        _toggleSelected() {

            this.selected = !this.selected;
        }
    }

    customElements.define('c-voicemail', Voicemail);
})();

