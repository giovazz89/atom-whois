'use babel';

export default class AtomWhoisView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('atom-whois');
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

    setText(title, text, centered = 0) {
        while (this.element.firstChild)
            this.element.removeChild(this.element.firstChild);

		header = document.createElement('h3');
        header.classList.add('text-center');
        header.textContent = title;
        this.element.appendChild(header);

        message = document.createElement('p');
		if(centered) message.classList.add('text-center');
        message.textContent = text;
        this.element.appendChild(message);
    }

	clearText(){
        while (this.element.firstChild)
            this.element.removeChild(this.element.firstChild);

		message = document.createElement('h3');
        message.classList.add('text-center');
        message.textContent = 'Loading whois data...';
        this.element.appendChild(message);
	}

}
