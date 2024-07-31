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
if ( ! $disclaimerHtml ) {
	return;
}

$additAttribs = [
	"class" => "wp-content-consent-block",
]

?>
<div <?php echo get_block_wrapper_attributes( $additAttribs ); ?>>
	<?php echo $attributes["disclaimerHtml"] ?>
</div>
