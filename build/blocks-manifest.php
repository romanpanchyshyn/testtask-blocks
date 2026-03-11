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
	),
	'hero2' => array(
		'apiVersion' => 3,
		'name' => 'testtask-core/hero2',
		'title' => 'Hero Section 2',
		'category' => 'widgets',
		'icon' => 'cover-image',
		'description' => 'Custom hero section block.',
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string'
			),
			'description' => array(
				'type' => 'string'
			),
			'buttonPrimaryText' => array(
				'type' => 'string',
				'default' => 'Book a demo'
			),
			'buttonPrimaryUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'buttonSecondaryText' => array(
				'type' => 'string',
				'default' => 'Contact Us'
			),
			'buttonSecondaryUrl' => array(
				'type' => 'string',
				'default' => ''
			),
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
			),
			'titleFontSize' => array(
				'type' => 'number',
				'default' => 64
			),
			'descriptionFontSize' => array(
				'type' => 'number',
				'default' => 24
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php'
	),
	'testtask-blocks' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/testtask-blocks',
		'version' => '0.1.0',
		'title' => 'Testtask Blocks',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'testtask-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
