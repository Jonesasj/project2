(function() {

    //I'll change this when I find out how to
    const template = document.createElement('template');
    template.innerHTML = `
                        <style>
                            :host {
                                display: flex;
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
                            <audio controls>
                                <source src="test.mp3" type="audio/mpeg">
                            </audio>
                            <p>This is a test description</p>
                            <div>
                                    <time>10:00</time>
                            </div>        
                        </div>
    `;

    let voicemailCounter = 0;


    class Voicemail extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this._toggleSelected = this._toggleSelected.bind(this);

        }

        connectedCallback() {
            this.shadowRoot.querySelector('input').addEventListener('click', this._toggleSelected);
            if (!this.id) {
                this.id = `voicemail-id-${voicemailCounter++}`;
                console.log(this.id);
            }
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

        _toggleSelected() {
            this.selected = !this.selected;
            this.dispatchEvent(new CustomEvent('selectVoicemail', {
                detail: {
                    selected: this.selected,
                    voicemailId: this.id
                },
                bubbles: true
            }));
            console.log(this.selected);
            console.log(this.id);
        }
    }

    customElements.define('c-voicemail', Voicemail);
})();

