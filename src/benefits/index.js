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
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { ServerSideRender } from '@wordpress/server-side-render';
import metadata from './block.json';

registerBlockType(metadata.name, {
	edit({ attributes, setAttributes }) {
		const {
			title,
			postsPerPage,
			showFilters,
			paddingTop,
			paddingBottom,
			backgroundColor,
		} = attributes;

		const blockProps = useBlockProps();

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

						<TextControl
							label={__('Background Color', 'testtask')}
							value={backgroundColor}
							onChange={(value) => setAttributes({ backgroundColor: value })}
						/>
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