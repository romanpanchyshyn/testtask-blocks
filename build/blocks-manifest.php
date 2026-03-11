<?php
// This file is generated. Do not modify it manually.
return array(
	'benefits' => array(
		'apiVersion' => 3,
		'name' => 'testtask-core/benefits',
		'title' => 'Benefits Section',
		'category' => 'widgets',
		'icon' => 'awards',
		'description' => 'Benefits section with AJAX filter.',
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Some H2 title'
			),
			'titleFontSize' => array(
				'type' => 'number',
				'default' => 48
			),
			'postsPerPage' => array(
				'type' => 'number',
				'default' => 6
			),
			'showFilters' => array(
				'type' => 'boolean',
				'default' => true
			),
			'paddingTop' => array(
				'type' => 'string',
				'default' => '80px'
			),
			'paddingBottom' => array(
				'type' => 'string',
				'default' => '80px'
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'hero' => array(
		'apiVersion' => 3,
		'name' => 'testtask-core/hero',
		'title' => 'Hero Section',
		'category' => 'widgets',
		'icon' => 'cover-image',
		'description' => 'Custom hero section block with limited inner blocks.',
		'supports' => array(
			'html' => false,
			'align' => array(
				'full'
			)
		),
		'attributes' => array(
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageId' => array(
				'type' => 'number',
				'default' => 0
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => 'Hero Image'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
