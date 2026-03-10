<?php
if (!defined('ABSPATH')) {
	exit;
}

$title            = $attributes['title'] ?? 'Some H2 title';
$posts_per_page   = !empty($attributes['postsPerPage']) ? (int) $attributes['postsPerPage'] : 6;
$show_filters     = isset($attributes['showFilters']) ? (bool) $attributes['showFilters'] : true;
$padding_top      = $attributes['paddingTop'] ?? '80px';
$padding_bottom   = $attributes['paddingBottom'] ?? '80px';
$background_color = $attributes['backgroundColor'] ?? '#ffffff';

$terms = get_terms([
	'taxonomy'   => 'benefit_category',
	'hide_empty' => true,
]);

$query = new WP_Query([
	'post_type'      => 'benefit',
	'post_status'    => 'publish',
	'posts_per_page' => $posts_per_page,
	'paged'          => 1,
]);

$style = sprintf(
	'padding-top:%s;padding-bottom:%s;background-color:%s;',
	esc_attr($padding_top),
	esc_attr($padding_bottom),
	esc_attr($background_color)
);
?>

<section
	data-ajax-url="<?php echo esc_url(admin_url('admin-ajax.php')); ?>"
	data-posts-per-page="<?php echo esc_attr($posts_per_page); ?>"
	data-current-page="1"
	data-max-pages="<?php echo esc_attr((int) $query->max_num_pages); ?>"
	data-current-term="all"
	<?php echo get_block_wrapper_attributes([
		'class' => 'benefits',
		'style' => $style,
	]); ?>
>
	<div class="wrap">
		<?php if ($title) : ?>
		<h2 class="section-title" style="font-size: <?php echo esc_attr( $attributes['titleFontSize'] ); ?>px;">
			<?php echo esc_html( $attributes['title'] ); ?>
		</h2>

		<?php endif; ?>

		<?php if ($show_filters && !empty($terms) && !is_wp_error($terms)) : ?>
			<div class="benefits__filters-wrap">
				<div class="benefits__filters">
					<button type="button" class="benefits__filter is-active" data-term="all">
						<?php esc_html_e('All', 'testtask'); ?>
					</button>

					<?php foreach ($terms as $term) : ?>
						<button
							type="button"
							class="benefits__filter"
							data-term="<?php echo esc_attr($term->slug); ?>">
							<?php echo esc_html($term->name); ?>
						</button>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endif; ?>

		<div class="benefits__results">
			<?php if ($query->have_posts()) : ?>
				<div class="benefits__grid">
					<?php while ($query->have_posts()) : $query->the_post(); ?>
						<?php get_template_part('template-parts/benefits/item'); ?>
					<?php endwhile; ?>
				</div>
				<?php wp_reset_postdata(); ?>
			<?php else : ?>
				<p><?php esc_html_e('No benefits found.', 'testtask'); ?></p>
			<?php endif; ?>
		</div>

		<?php if ($query->max_num_pages > 1) : ?>
			<button type="button" class="benefits__load-more">
				<?php esc_html_e('Load more...', 'testtask'); ?>
			</button>
		<?php endif; ?>
	</div>
</section>