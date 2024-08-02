<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @var $attributes array The block attributes
 * @var $content string The default content
 * @var $block WP_Block The block instance
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$consentId      = $attributes["consentId"];
if ( ! $consentId ) {
	return;
}

$disclaimerHtml = $attributes["disclaimerHtml"];
$enableBtnCaption  =  __($attributes["enableBtnCaption"] ?? "Show content", "wp-content-consent-blocks" );
$disableBtnCaption =  __( $attributes["disableBtnCaption"] ?? "Hide content", "wp-content-consent-blocks" );
$usePlainHtmlDisclaimer = $attributes["customDisclaimerHtml"] === true;

$interactivityContext = json_encode( [
	"consentId"         => $consentId,
	"contentHtml"       => $attributes["contentHtml"],
	"consentGiven"      => false,
] );

?>
<div <?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="wp-content-consent-blocks/plain-html-consent"
	data-wp-context="<?php echo esc_attr( $interactivityContext ) ?>"
	data-wp-init="callbacks.initConsent"
>
	<div id="disclaimer--<?php echo esc_attr( $consentId ) ?>" class="content-container content-disclaimer"
		 data-wp-bind--hidden="context.consentGiven"
	>
		<?php
			if ($usePlainHtmlDisclaimer) {
				echo $disclaimerHtml;
			} else {
				echo do_blocks($content);
			}
		?>
		<button class="toggle-button" data-wp-on--click="actions.showContent">
			<?php echo esc_html( $enableBtnCaption ) ?>
		</button>
	</div>
	<div id="content--<?php echo esc_attr( $consentId ) ?>" class="content"></div>
	<div class="content-container" data-wp-bind--hidden="!context.consentGiven">
		<button class="toggle-button" data-wp-on--click="actions.hideContent">
			<?php echo esc_html( $disableBtnCaption ) ?>
		</button>
	</div>
</div>
