import { recordTracksEvent } from '@automattic/calypso-analytics';
import { HELP_CENTER_STORE } from '@automattic/help-center/src/stores';
import { localizeUrl } from '@automattic/i18n-utils';
import { Button, ExternalLink } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useState, JSXElementConstructor, ReactElement } from 'react';

interface Props {
	children: string | ReactElement< string | JSXElementConstructor< any > >;
	title: string;
	url: string;
	postId: number;
}

export default function DescriptionSupportLink( {
	children,
	title,
	url,
	postId,
}: Props ): JSX.Element {
	// This was cooked up to only apply the link in the BlockEditor sidebar.
	// Since there was no identifier in the environment to differentiate.
	const [ ref, setRef ] = useState< Element | null >();
	const { setShowHelpCenter, setShowSupportDoc } = useDispatch( HELP_CENTER_STORE );

	if ( ref && ! ref?.closest( '.block-editor-block-inspector' ) ) {
		return children as JSX.Element;
	}

	return (
		<>
			{ children }
			<br />
			{ setShowHelpCenter ? (
				<Button
					onClick={ () => {
						setShowHelpCenter( true );
						setShowSupportDoc( localizeUrl( url ), postId );
						recordTracksEvent( 'calypso_block_description_support_link_click', {
							block: title,
							support_link: url,
						} );
					} }
					style={ { marginTop: 10, height: 'unset' } }
					ref={ ( reference ) => ref !== reference && setRef( reference ) }
					className="fse-inline-support-link is-compact"
					variant="link"
				>
					{ __( 'Learn more', 'full-site-editing' ) }
				</Button>
			) : (
				<ExternalLink
					onClick={ () => {
						recordTracksEvent( 'calypso_block_description_support_link_click', {
							block: title,
							support_link: url,
						} );
					} }
					ref={ ( reference ) => ref !== reference && setRef( reference ) }
					style={ { display: 'block', marginTop: 10, maxWidth: 'fit-content' } }
					className="fse-inline-support-link"
					href={ url }
				>
					{ __( 'Learn more', 'full-site-editing' ) }
				</ExternalLink>
			) }
		</>
	);
}
