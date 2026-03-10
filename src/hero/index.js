import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	RangeControl
} from '@wordpress/components';

import metadata from './block.json';
import './style.scss';
import './editor.scss';

registerBlockType(metadata.name, {
	edit({ attributes, setAttributes }) {
		const {
			buttonPrimaryText,
			buttonPrimaryUrl,
			buttonSecondaryText,
			buttonSecondaryUrl,
			imageUrl,
			imageId,
			imageAlt,
			title,
			description,
			titleFontSize,
			descriptionFontSize
		} = attributes;

		const blockProps = useBlockProps({
			className: 'hero alignfull'
		});

		const onSelectImage = (media) => {
			setAttributes({
				imageUrl: media.url,
				imageId: media.id,
				imageAlt: media.alt || 'Hero Image'
			});
		};

		const removeImage = () => {
			setAttributes({
				imageUrl: '',
				imageId: 0,
				imageAlt: ''
			});
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Hero Settings', 'testtask')}>
						<div style={{ marginBottom: '16px' }}>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={['image']}
									value={imageId}
									render={({ open }) => (
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
									)}
								/>
							</MediaUploadCheck>
						</div>

						<TextControl
							label={__('Primary Button Text', 'testtask')}
							value={buttonPrimaryText}
							onChange={(value) => setAttributes({ buttonPrimaryText: value })}
						/>

						<TextControl
							label={__('Primary Button URL', 'testtask')}
							value={buttonPrimaryUrl}
							onChange={(value) => setAttributes({ buttonPrimaryUrl: value })}
							placeholder="https://example.com"
						/>

						<TextControl
							label={__('Secondary Button Text', 'testtask')}
							value={buttonSecondaryText}
							onChange={(value) => setAttributes({ buttonSecondaryText: value })}
						/>

						<TextControl
							label={__('Secondary Button URL', 'testtask')}
							value={buttonSecondaryUrl}
							onChange={(value) => setAttributes({ buttonSecondaryUrl: value })}
							placeholder="https://example.com"
						/>

						<TextControl
							label={__('Image Alt', 'testtask')}
							value={imageAlt}
							onChange={(value) => setAttributes({ imageAlt: value })}
						/>
					</PanelBody>

					<PanelBody title={__('Typography', 'testtask')} initialOpen={false}>
						<RangeControl
							label={__('Title Font Size', 'testtask')}
							value={titleFontSize}
							onChange={(value) => setAttributes({ titleFontSize: value })}
							min={24}
							max={100}
						/>

						<RangeControl
							label={__('Description Font Size', 'testtask')}
							value={descriptionFontSize}
							onChange={(value) => setAttributes({ descriptionFontSize: value })}
							min={14}
							max={40}
						/>
					</PanelBody>
				</InspectorControls>

				<section {...blockProps}>
					<div className="hero__container wrap">
						<div className="hero__content">
							<RichText
								tagName="h1"
								className="hero__title"
								value={title}
								onChange={(value) => setAttributes({ title: value })}
								placeholder={__('Add hero title...', 'testtask')}
								style={{
									fontSize: `${titleFontSize}px`
								}}
							/>

							<RichText
								tagName="div"
								className="hero__description"
								value={description}
								onChange={(value) => setAttributes({ description: value })}
								placeholder={__('Add hero description...', 'testtask')}
								style={{
									fontSize: `${descriptionFontSize}px`
								}}
							/>

							<div className="hero__cta">
								<RichText
									tagName="a"
									className="btn-hero btn-hero--primary"
									value={buttonPrimaryText}
									onChange={(value) => setAttributes({ buttonPrimaryText: value })}
									placeholder={__('Primary button text', 'testtask')}
									allowedFormats={[]}
								/>

								<RichText
									tagName="a"
									className="btn-hero"
									value={buttonSecondaryText}
									onChange={(value) => setAttributes({ buttonSecondaryText: value })}
									placeholder={__('Secondary button text', 'testtask')}
									allowedFormats={[]}
								/>
							</div>
						</div>

						<div className="hero__media">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={['image']}
									value={imageId}
									render={({ open }) =>
										imageUrl ? (
											<div className="hero__media-inner">
												<img
													src={imageUrl}
													alt={imageAlt}
													onClick={open}
													style={{ cursor: 'pointer' }}
												/>

												<div
													className="hero__media-actions"
													style={{ display: 'flex', gap: '8px', marginTop: '12px' }}
												>
													<Button variant="secondary" onClick={open}>
														{__('Replace Image', 'testtask')}
													</Button>

													<Button variant="tertiary" isDestructive onClick={removeImage}>
														{__('Remove Image', 'testtask')}
													</Button>
												</div>
											</div>
										) : (
											<div className="hero__image-placeholder">
												<Button variant="primary" onClick={open}>
													{__('Select Hero Image', 'testtask')}
												</Button>
											</div>
										)
									}
								/>
							</MediaUploadCheck>
						</div>
					</div>
				</section>
			</>
		);
	},

	save() {
		return null;
	}
});