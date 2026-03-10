import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	RangeControl,
	ColorPalette,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { ServerSideRender } from '@wordpress/server-side-render';
import metadata from './block.json';

registerBlockType(metadata.name, {
	edit({ attributes, setAttributes }) {
		const {
			title,
			postsPerPage,
			titleFontSize,
			showFilters,
			paddingTop,
			paddingBottom,
			backgroundColor,
		} = attributes;

		const blockProps = useBlockProps({
			className: 'alignfull',
			style: {
				backgroundColor: backgroundColor
			}
		});

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Benefits Settings', 'testtask')}>
						<TextControl
							label={__('Section Title', 'testtask')}
							value={title}
							onChange={(value) => setAttributes({ title: value })}
						/>
						<RangeControl
							label={__('Title Font Size', 'testtask')}
							value={titleFontSize}
							onChange={(value) => setAttributes({ titleFontSize: value })}
							min={16}
							max={72}
						/>

						<RangeControl
							label={__('Posts Per Page', 'testtask')}
							value={postsPerPage}
							onChange={(value) => setAttributes({ postsPerPage: value })}
							min={1}
							max={12}
						/>

						<ToggleControl
							label={__('Show Filters', 'testtask')}
							checked={showFilters}
							onChange={(value) => setAttributes({ showFilters: value })}
						/>

						<UnitControl
							label={__('Padding Top', 'testtask')}
							value={paddingTop}
							onChange={(value) => setAttributes({ paddingTop: value })}
						/>

						<UnitControl
							label={__('Padding Bottom', 'testtask')}
							value={paddingBottom}
							onChange={(value) => setAttributes({ paddingBottom: value })}
						/>

						<div>
							<p>{__('Background Color', 'testtask')}</p>

							<ColorPalette
								value={backgroundColor}
								onChange={(color) =>
									setAttributes({ backgroundColor: color })
								}
							/>
						</div>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>

					<ServerSideRender
						block={metadata.name}
						attributes={attributes}
					/>
				</div>
			</>
		);
	},

	save() {
		return null;
	},
});