(function(){

    class PageSelector extends HTMLSelectElement {

        static get observedAttributes() {
            return['numpages'];
        }

        constructor() {
            super();
            //this.attachShadow({mode: 'open'});
            //this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.addEventListener('change', this._changePage);
        }
        connectedCallback() {
            console.log('created');
        }


        attributeChangedCallback(name, oldVal, newVal) {
            console.log('here');
            if(name === 'numpages') {
                this._updateOptions();
            }
        }

        _listen(e) {
            console.log(e.detail.page);
        }

        get numpages() {
            return this.getAttribute('numpages');
        }

        set numpages(value) {
            this.setAttribute('numpages', value);
        }

        get pagenumber() {
            return this.getAttribute('pagenumber');
        }

        set pagenumber(value) {
            this.setAttribute('pagenumber', value);
            
        }

        _removeOptions() {
            var options = this.querySelectorAll('option');
            options.forEach((node) => {
                node.remove();
            });
        }

        //adds an option element for each page
        _updateOptions() {
            this._removeOptions()
            for(let i = 0; i < this.numpages; i++) {
                let option = document.createElement('option');
                let pageNum = parseInt(i) + 1;
                option.setAttribute('pagenumber', pageNum);
                if(i === this.pagenumber - 1) {
                    option.setAttribute('selected', '');
                }
                let optionText = document.createTextNode(pageNum);
                option.appendChild(optionText);
                this.appendChild(option);
            }

        }

        _changePage() {
            console.log('clicked');
            console.log(this.value);
            //dispatch an event upwards to inform the page has been changed
            this.dispatchEvent(new CustomEvent('pagechange', {
                bubbles: true,
                composed: true,
                detail: {
                    page: parseInt(this.value)                    
                }
            }));
        }
    }

    customElements.define('c-pageselector', PageSelector, {extends: 'select'});

})();