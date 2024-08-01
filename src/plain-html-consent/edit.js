import React from "react";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {InnerBlocks, InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {PanelBody, TextareaControl, TextControl, ToggleControl} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	React.useEffect(() => {
		const randomId = window.crypto?.randomUUID?.() ?? "n/a";
		if (!attributes.consentId) {
			setAttributes({
				consentId: randomId
			})
		}
	}, [attributes.consentId]);
	const useCustomDisclaimer = !!attributes.customDisclaimerHtml;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "wp-content-consent-blocks")}>
					<TextControl label={__("ConsentId", "wp-content-consent-blocks")}
								 value={attributes.consentId}
								 onChange={next => setAttributes({
									 consentId: next
								 })}
					/>
					<TextControl
						label={__("Give consent caption", "wp-content-consent-blocks")}
						value={attributes.enableBtnCaption}
						onChange={next => {
							setAttributes({
								enableBtnCaption: next,
							})
						}}
					/>
					<TextControl
						label={__("Withdraw consent caption", "wp-content-consent-blocks")}
						value={attributes.disableBtnCaption}
						onChange={next => {
							setAttributes({
								disableBtnCaption: next,
							})
						}}
					/>
					<ToggleControl label={__("Use HTML for disclaimer", "wp-content-consent-blocks")}
								   checked={useCustomDisclaimer}
								   onChange={next => {
									   setAttributes({
										   customDisclaimerHtml: next,
									   })
								   }}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({
				className: 'block-plain-html-consent',
			})}>
				<TextareaControl label="Content (HTML)" value={attributes.contentHtml ?? ""}
								 onChange={next => setAttributes({
									 contentHtml: next,
								 })}/>
				{!useCustomDisclaimer && (
					<>
						<label className="my-2">Disclaimer</label>
						<InnerBlocks />
					</>
				)}
				{useCustomDisclaimer && (
					<TextareaControl label="Disclaimer (HTML)"
									 className="mt-2"
									 value={attributes.disclaimerHtml ?? ""}
									 onChange={next => setAttributes({
										 disclaimerHtml: next,
									 })}/>
				)}
			</div>
		</>
	);
}
