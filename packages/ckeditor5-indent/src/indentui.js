/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module indent/indentui
 */
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import Plugin from '../plugin';

/**
 * The indent feature.
 *
 * This plugin registers the `'indent'` and `'outdent'` buttons.
 *
 * **Note**: In order the commands to work at least one of compatible features is required. Read more in
 * {@link module:indent/indent~Indent indent feature} api docs.
 *
 * @extends module:core/plugin~Plugin
 */
export default class IndentUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'IndentUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;

		this._defineButton( 'indent', t( 'Increase indent' ) );
		this._defineButton( 'outdent', t( 'Decrease indent' ) );
	}

	/**
	 * Defines an UI button.
	 *
	 * @param {String} commandName
	 * @param {String} label
	 * @private
	 */
	_defineButton( commandName, label ) {
		const editor = this.editor;

		editor.ui.componentFactory.add( commandName, locale => {
			const command = editor.commands.get( commandName );
			const view = new ButtonView( locale );

			view.set( {
				label,
				withText: true,
				tooltip: true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			this.listenTo( view, 'execute', () => editor.execute( commandName ) );

			return view;
		} );
	}
}
