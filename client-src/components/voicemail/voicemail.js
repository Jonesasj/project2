(function() {

    //I'll change this when I find out how to
    const template = document.createElement('template');
    template.innerHTML = `
                        <style>
                            :host {
                                display: flex;
                                font-weight: bold;
                            }
                            :host([read]){
                                color: grey;
                                font-weight: normal;
                            }
                            .flex-container {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                align-content: space-between;
                                justify-content: space-evenly;
                                border-style: solid;
                                border-width: 3px;
                                overflow: hidden;
                            }
                        </style>
                        <div class="flex-container">
                            <input type="checkbox" name="selected">
                            <div>
                                <slot>Caller Unknown</slot>
                            </div>
                            <audio controls>
                                <source src="test.mp3" type="audio/mpeg">
                            </audio>
                            <slot name="transcript"></slot>
                            <div>
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

            
            /*this.selected = !this.selected;
            this.dispatchEvent(new CustomEvent('selectVoicemail', {
                detail: {
                    selected: this.selected,
                    voicemailId: this.id
                },
                bubbles: true
            }));
            console.log(this.selected);
            console.log(this.id);*/
        }
    }

    customElements.define('c-voicemail', Voicemail);
})();

