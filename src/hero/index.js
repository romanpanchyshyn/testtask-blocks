import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import metadata from './block.json';
import './editor.scss';
import './style.scss';

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

const HERO_TEMPLATE = [
  [ 'core/heading', { 
    placeholder: 'Add hero title...', 
    level: 1, 
    style: { typography: { fontSize: '64px' } }
} ],
  [ 'core/paragraph', { 
    placeholder: 'Add hero description...',
    style: { typography: { fontSize: '24px' } }
} 
],
  [ 'core/buttons', {}, [
      [ 'core/button', { 
		    backgroundColor: 'primary',
            text: 'Learn more',
          style: {
			border: {
				radius: 0
			}
          }
      } ]
  ] ]
];

registerBlockType(metadata.name, {
	edit({ attributes, setAttributes }) {
		const { imageUrl, imageId, imageAlt } = attributes;

		const blockProps = useBlockProps({ className: 'hero alignfull' });

		const onSelectImage = (media) => {
			setAttributes({
				imageUrl: media.url,
				imageId: media.id,
				imageAlt: media.alt || 'Hero Image'
			});
		};

		const removeImage = () => {
			setAttributes({ imageUrl: '', imageId: 0, imageAlt: '' });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Hero Image', 'testtask')}>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectImage}
								allowedTypes={['image']}
								value={imageId}
								render={({ open }) =>
									imageUrl ? (
										<div className="hero__image-wrapper">
											<img src={imageUrl} alt={imageAlt} />
											<div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
												<Button variant="secondary" onClick={open}>
													{__('Replace Image', 'testtask')}
												</Button>
												<Button variant="tertiary" isDestructive onClick={removeImage}>
													{__('Remove Image', 'testtask')}
												</Button>
											</div>
										</div>
									) : (
										<Button variant="primary" onClick={open}>
											{__('Select Hero Image', 'testtask')}
										</Button>
									)
								}
							/>
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>

				<section {...blockProps}>
					<div className="hero__container wrap">
						<div className="hero__content">
                            <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={HERO_TEMPLATE}
                            templateLock={false}
                            />						
                        </div>

						{imageUrl && (
							<div className="hero__media">
								<img src={imageUrl} alt={imageAlt} />
							</div>
						)}
					</div>
				</section>
			</>
		);
	},

	save({ attributes }) {
		const { imageUrl, imageAlt } = attributes;
		const blockProps = useBlockProps.save({ className: 'hero alignfull' });

		return (
			<section {...blockProps}>
				<div className="hero__container wrap">
					<div className="hero__content">
						<InnerBlocks.Content />
					</div>
					{imageUrl && (
						<div className="hero__media">
							<img src={imageUrl} alt={imageAlt} />
						</div>
					)}
				</div>
			</section>
		);
	}
});