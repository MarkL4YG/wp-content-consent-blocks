<?php
/**
 * Plugin Name: WP Content Consent Blocks
 * Description: A wordpress plugin which adds blocks to dynamically show content after the viewer consented to it.
 * Version: 1.0.0
 * Plugin URI: https://github.com/MarkL4YG/wp-content-consent-blocks#readme
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Author: MarkL4YG
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function wp_content_consent_blocks_init() {
	register_block_type( __DIR__ . '/blocks/plain-html-consent' );
}

add_action('init', 'wp_content_consent_blocks_init');
