<?php
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	$title                 = $attributes['title'] ?? '';
	$description           = $attributes['description'] ?? '';
	$button_primary_text   = $attributes['buttonPrimaryText'] ?? '';
	$button_primary_url    = $attributes['buttonPrimaryUrl'] ?? '#';
	$button_secondary_text = $attributes['buttonSecondaryText'] ?? '';
	$button_secondary_url  = $attributes['buttonSecondaryUrl'] ?? '#';
	$image_url             = $attributes['imageUrl'] ?? '';
	$image_alt             = $attributes['imageAlt'] ?? 'Hero Image';
	$title_font_size       = isset( $attributes['titleFontSize'] ) ? (int) $attributes['titleFontSize'] : 56;
	$description_font_size = isset( $attributes['descriptionFontSize'] ) ? (int) $attributes['descriptionFontSize'] : 20;
?>

<section class="hero alignfull">
	<div class="hero__container wrap">
		<div class="hero__content">
			<?php if ( $title ) : ?>
				<h1
					class="hero__title"
					style="font-size: <?php echo esc_attr( $title_font_size ); ?>px;"
				>
					<?php echo wp_kses_post( $title ); ?>
				</h1>
			<?php endif; ?>

			<?php if ( $description ) : ?>
				<div
					class="hero__description"
					style="font-size: <?php echo esc_attr( $description_font_size ); ?>px;"
				>
					<?php echo wpautop( $description ); ?>
				</div>
			<?php endif; ?>

			<?php if ( $button_primary_text || $button_secondary_text ) : ?>
				<div class="hero__cta">
					<?php if ( $button_primary_text ) : ?>
						<a href="<?php echo esc_url( $button_primary_url ); ?>" class="btn-hero btn-hero--primary">
							<?php echo esc_html( $button_primary_text ); ?>
						</a>
					<?php endif; ?>

					<?php if ( $button_secondary_text ) : ?>
						<a href="<?php echo esc_url( $button_secondary_url ); ?>" class="btn-hero">
							<?php echo esc_html( $button_secondary_text ); ?>
						</a>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>

		<div class="hero__media">
			<?php if ( $image_url ) : ?>
				<img
					src="<?php echo esc_url( $image_url ); ?>"
					alt="<?php echo esc_attr( $image_alt ); ?>"
				>
			<?php else : ?>
				<img
					src="<?php echo esc_url( get_template_directory_uri() . '/media/hero.jpg' ); ?>"
					alt="Hero Image"
				>
			<?php endif; ?>
		</div>
	</div>
</section>