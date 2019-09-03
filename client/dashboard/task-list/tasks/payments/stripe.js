/** @format */
/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { withDispatch } from '@wordpress/data';
import interpolateComponents from 'interpolate-components';
import { Modal } from '@wordpress/components';
import { Button } from 'newspack-components';

/**
 * WooCommerce dependencies
 */

class Stripe extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			showErrorModal: false,
			errorMessage: '',
			connectURL: '',
			showConnectionButtons: ! props.manualConfig && ! props.createAccount,
			showManualConfiguration: props.manualConfig,
		};
	}

	componentDidMount() {
		const { createAccount } = this.props;
		const { showConnectionButtons } = this.state;

		if ( createAccount ) {
			this.autoCreateAccount();
		}

		if ( showConnectionButtons ) {
			this.fetchOAuthConnectURL();
		}
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( false === prevState.showConnectionButtons && this.state.showConnectionButtons ) {
			this.fetchOAuthConnectURL();
		}
	}

	async fetchOAuthConnectURL() {
		const { returnUrl } = this.props;
		try {
			const result = await apiFetch( {
				path: '/wc/v1/connect/stripe/oauth/init', // @todo namespace
				method: 'POST',
				data: {
					returnUrl,
				},
			} );
			if ( ! result || ! result.oauthUrl ) {
				this.setState( {
					showConnectionButtons: false,
					showManualConfiguration: true,
				} );
				return;
			}
			this.setState( {
				connectURL: result.oauthUrl,
			} );
		} catch ( error ) {
			// Fallback to manual configuration if the OAuth URL cannot be grabbed.
			this.setState( {
				showConnectionButtons: false,
				showManualConfiguration: true,
			} );
		}
	}

	async autoCreateAccount() {
		const { email, countryCode, returnUrl } = this.props;
		try {
			const result = await apiFetch( {
				path: '/wc/v1/connect/stripe/account', // @todo namespace
				method: 'POST',
				data: {
					email,
					country: countryCode,
				},
			} );

			if ( result ) {
				window.location = returnUrl;
				return;
			}
		} catch ( error ) {
			let errorTitle, errorMessage;
			// This seems to be the best way to handle this.
			// github.com/Automattic/woocommerce-services/blob/cfb6173deb3c72897ee1d35b8fdcf29c5a93dea2/woocommerce-services.php#L563-L570
			if ( -1 === error.message.indexOf( 'Account already exists for the provided email' ) ) {
				errorTitle = __( 'Stripe', 'woocommerce-admin' );
				errorMessage = interpolateComponents( {
					mixedString: sprintf(
						__(
							'We tried to create a Stripe account automatically for {{strong}}%s{{/strong}}, but an error occured. ' +
								'Please try connecting manually to continue.',
							'woocommerce-admin'
						),
						email
					),
					components: {
						strong: <strong />,
					},
				} );
			} else {
				errorTitle = __( 'You already have a Stripe account', 'woocommerce-admin' );
				errorMessage = interpolateComponents( {
					mixedString: sprintf(
						__(
							'We tried to create a Stripe account automatically for {{strong}}%s{{/strong}}, but one already exists. ' +
								'Please sign in and connect to continue.',
							'woocommerce-admin'
						),
						email
					),
					components: {
						strong: <strong />,
					},
				} );
			}

			this.setState( {
				showErrorModal: true,
				showConnectionButtons: true,
				errorTitle,
				errorMessage,
			} );
		}
	}

	/*
	<Button isDefault onClick={ () => setState( { isOpen: false } ) }>
					My custom close button
				</Button>
				*/

	renderErrorModal() {
		const { errorTitle, errorMessage } = this.state;
		return (
			<Modal
				title={ errorTitle }
				onRequestClose={ () => this.setState( { showErrorModal: false } ) }
				className="woocommerce-task-payments__stripe-error-modal"
			>
				<div className="woocommerce-task-payments__stripe-error-wrapper">
					<div className="woocommerce-task-payments__stripe-error-message">{ errorMessage }</div>
					<Button isPrimary isDefault onClick={ () => this.setState( { showErrorModal: false } ) }>
						{ __( 'OK', 'woocommerce-admin' ) }
					</Button>
				</div>
			</Modal>
		);
	}

	renderConnectButton() {
		const { connectURL } = this.state;
		return (
			<Button isPrimary isDefault href={ connectURL }>
				{ __( 'Connect', 'woocommerce-admin' ) }
			</Button>
		);
	}

	render() {
		const { showErrorModal, showConnectionButtons, connectURL } = this.state;

		if ( showErrorModal ) {
			return this.renderErrorModal();
		}

		if ( showConnectionButtons && connectURL ) {
			return this.renderConnectButton();
		}

		return null;
	}
}

export default compose(
	withDispatch( dispatch => {
		const { createNotice } = dispatch( 'core/notices' );
		return {
			createNotice,
		};
	} )
)( Stripe );
