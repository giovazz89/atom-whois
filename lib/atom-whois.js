'use babel';

import AtomWhoisView from './atom-whois-view';
import {
    CompositeDisposable,
	BufferedProcess
} from 'atom';

export default {

    atomWhoisView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.atomWhoisView = new AtomWhoisView(state.atomWhoisViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.atomWhoisView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that show this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-whois:lookup': () => this.lookup(),
            'core:cancel': () => this.hide()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.atomWhoisView.destroy();
    },

    serialize() {
        return {
            atomWhoisViewState: this.atomWhoisView.serialize()
        };
    },

    lookup() {
        if (this.modalPanel.isVisible())
        	return this.modalPanel.hide()

		this.atomWhoisView.clearText()

		editor = atom.workspace.getActiveTextEditor()
		domain = editor.getSelectedText();
		title = 'Whois result for '+domain
		result = ''
        this.modalPanel.show();

		command = 'whois'
		args = [domain]
		stdout = (output) => result += output
		exit = (code) => this.atomWhoisView.setText(title, result, code)
		process = new BufferedProcess({command, args, stdout, exit})

		return
	},

	hide() {
	    return this.modalPanel.hide();
	}

};
