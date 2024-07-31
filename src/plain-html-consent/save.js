import { useBlockProps } from '@wordpress/block-editor';
import { Button } from "@wordpress/components";
import React from "react";

export default function save({ attributes }) {
    const [consentGiven, setConsentGiven] = React.useState(false);
    const { disclaimerHtml, contentHtml, consentId } = attributes;
    const disableButtonCaption = attributes.disableBtnCaption ?? "Inhalt ausblenden";
    const enableButtonCaption = attributes.enableBtnCaption ?? "Inhalt anzeigen";
    const btnCaption = consentGiven ? disableButtonCaption : enableButtonCaption;

    React.useEffect(() => {
        !!consentId && setConsentGiven(localStorage.getItem("content-consent_" + consentId) === "true");
    }, [consentId])

    if (!consentId || !disclaimerHtml) {
        return undefined;
    }

    const onClickBtn = () => {
        const next = !consentGiven;
        setConsentGiven(next);
        localStorage.setItem("content-consent_" + consentId, next);
        if (!next) {
            window.setTimeout(() => {
                console.info("Consent removed, reloading page to ensure any scripts are unloaded.")
                location.reload();
            }, 0);
        }
    }

    return (
        <div { ...useBlockProps.save({
            className: 'block-plain-html-consent',
        }) }>
            { !consentGiven && <div dangerouslySetInnerHTML={{ __html: disclaimerHtml }} /> }
            { consentGiven && <div dangerouslySetInnerHTML={{ __html: contentHtml }} /> }
            <Button onClick={onClickBtn}>{btnCaption}</Button>
        </div>
    );
}