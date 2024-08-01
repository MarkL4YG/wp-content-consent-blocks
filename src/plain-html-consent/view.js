/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import {getContext, getElement, store} from "@wordpress/interactivity";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './view.scss';

const {state, actions} = store("wp-content-consent-blocks/plain-html-consent", {
	actions: {
		toggleConsent: () => {
			const context = getContext();
			const nextConsent = !context.consentGiven
			context.consentGiven = nextConsent;

			if (!nextConsent) {
				actions.hideContent();
			} else {
				actions.showContent();
			}
		},
		hideContent: () => {
			const context = getContext();
			context.consentGiven = false;
			localStorage.removeItem("content-consent_" + context.consentId);
			console.info("Consent removed, reloading page to ensure any scripts are unloaded...");

			window.setTimeout(() => {
				location.reload();
			}, 300);
		},
		showContent: () => {
			const context = getContext();
			context.consentGiven = true;
			localStorage.setItem("content-consent_" + context.consentId, "true");
			console.info("User consented to display content id=" + context.consentId);

			const contentId = "content--" + context.consentId;
			const contentPlaceholder = document.getElementById(contentId);
			!contentPlaceholder && console.warn("Content placeholder not found:", contentId);

			if (contentPlaceholder) {
				contentPlaceholder.innerHTML = context.contentHtml;
				setTimeout(() => {
					actions.reinitScripts(contentPlaceholder)
				}, 300);
			}
		},
		/**
		 * Script tags aren't activated from setting Element#innerHtml. They need to be cloned using JavaScript to become executable.
		 * @param node {HTMLElement}
		 */
		reinitScripts: (node) => {
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children.item(i);
				if (child.tagName === "SCRIPT") {
					console.info("Found script node. Replacing...")
					const clone = document.createElement("script");
					clone.text = child.innerHTML;
					for (let attrIdx = 0; attrIdx < child.attributes.length; attrIdx++) {
						clone.setAttribute(child.attributes.item(attrIdx).name, child.attributes.item(attrIdx).value);
					}
					child.replaceWith(clone);

				} else if (child.children?.length > 0) {
					actions.reinitScripts(child);
				}
			}
		}
	},
	callbacks: {
		initConsent: () => {
			const context = getContext();
			const {consentId} = context;
			const consentGiven = localStorage.getItem("content-consent_" + consentId) === "true";
			context.consentGiven = consentGiven;
			console.info("Consent initialized for id=" + consentId + " with value=" + consentGiven);
			if (consentGiven) {
				actions.showContent();
			}
		}
	}
});
