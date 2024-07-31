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

$disclaimerHtml = $attributes["disclaimerHtml"];
$consentId      = $attributes["consentId"];
if ( ! $disclaimerHtml || ! $consentId ) {
	return;
}

$enableBtnCaption  = $attributes["enableBtnCaption"] ?? __( "Show content", "wp-content-consent-blocks" );
$disableBtnCaption = $attributes["disableBtnCaption"] ?? __( "Hide content", "wp-content-consent-blocks" );

$interactivityContext = json_encode( [
	"consentId"         => $consentId,
	"disclaimerHtml"    => $disclaimerHtml,
	"contentHtml"       => $attributes["contentHtml"],
	"enableBtnCaption"  => $attributes["enableBtnCaption"],
	"disableBtnCaption" => $attributes["disableBtnCaption"],
	"consentGiven"      => false,
] )

?>
<div <?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="wp-content-consent-blocks/plain-html-consent"
	data-wp-context="<?php echo esc_attr( $interactivityContext ) ?>"
	data-wp-init="callbacks.initConsent"
>
	<div id="disclaimer--<?php echo esc_attr( $consentId ) ?>" class="content-disclaimer">
		<?php echo $disclaimerHtml ?>
		<button class="toggle-button" data-wp-on--click="actions.showContent">
			<?php echo esc_html( $enableBtnCaption ) ?>
		</button>
	</div>
	<div id="content--<?php echo esc_attr( $consentId ) ?>" class="content"></div>
	<button class="toggle-button" data-wp-bind--hidden="!context.consentGiven" data-wp-on--click="actions.hideContent">
		<?php echo esc_html( $disableBtnCaption ) ?>
	</button>
</div>
