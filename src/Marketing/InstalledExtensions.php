<?php
/**
 * InstalledExtensions class file.
 */

namespace Automattic\WooCommerce\Admin\Marketing;

use Automattic\WooCommerce\Internal\Admin\Loader;
use Automattic\WooCommerce\Admin\PluginsHelper;

/**
 * Installed Marketing Extensions class.
 */
class InstalledExtensions {

	/**
	 * Gets an array of plugin data for the "Installed marketing extensions" card.
	 *
	 * Valid extensions statuses are: installed, activated, configured
	 */
	public static function get_data() {
		$data = [];

		$automatewoo = self::get_automatewoo_extension_data();
		$mailchimp   = self::get_mailchimp_extension_data();
		$facebook    = self::get_facebook_extension_data();
		$pinterest   = self::get_pinterest_extension_data();
		$google      = self::get_google_extension_data();
		$hubspot     = self::get_hubspot_extension_data();
		$amazon_ebay = self::get_amazon_ebay_extension_data();
		$mailpoet    = self::get_mailpoet_extension_data();

		if ( $automatewoo ) {
			$data[] = $automatewoo;
		}

		if ( $mailchimp ) {
			$data[] = $mailchimp;
		}

		if ( $facebook ) {
			$data[] = $facebook;
		}

		if ( $pinterest ) {
			$data[] = $pinterest;
		}

		if ( $google ) {
			$data[] = $google;
		}

		if ( $hubspot ) {
			$data[] = $hubspot;
		}

		if ( $amazon_ebay ) {
			$data[] = $amazon_ebay;
		}

		if ( $mailpoet ) {
			$data[] = $mailpoet;
		}

		return $data;
	}

	/**
	 * Get allowed plugins.
	 *
	 * @return array
	 */
	public static function get_allowed_plugins() {
		return [
			'automatewoo',
			'mailchimp-for-woocommerce',
			'creative-mail-by-constant-contact',
			'facebook-for-woocommerce',
			'pinterest-for-woocommerce',
			'google-listings-and-ads',
			'hubspot-for-woocommerce',
			'woocommerce-amazon-ebay-integration',
			'mailpoet',
		];
	}

	/**
	 * Get AutomateWoo extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_automatewoo_extension_data() {
		$slug = 'automatewoo';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/automatewoo.svg', WC_ADMIN_PLUGIN_FILE );

		if ( 'activated' === $data['status'] && function_exists( 'AW' ) ) {
			$data['settingsUrl'] = admin_url( 'admin.php?page=automatewoo-settings' );
			$data['docsUrl']     = 'https://automatewoo.com/docs/';
			$data['status']      = 'configured'; // Currently no configuration step.
		}

		return $data;
	}

	/**
	 * Get MailChimp extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_mailchimp_extension_data() {
		$slug = 'mailchimp-for-woocommerce';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/mailchimp.svg', WC_ADMIN_PLUGIN_FILE );

		if ( 'activated' === $data['status'] && function_exists( 'mailchimp_is_configured' ) ) {
			$data['docsUrl']     = 'https://mailchimp.com/help/connect-or-disconnect-mailchimp-for-woocommerce/';
			$data['settingsUrl'] = admin_url( 'admin.php?page=mailchimp-woocommerce' );

			if ( mailchimp_is_configured() ) {
				$data['status'] = 'configured';
			}
		}

		return $data;
	}

	/**
	 * Get Facebook extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_facebook_extension_data() {
		$slug = 'facebook-for-woocommerce';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/facebook.svg', WC_ADMIN_PLUGIN_FILE );

		if ( 'activated' === $data['status'] && function_exists( 'facebook_for_woocommerce' ) ) {
			$integration = facebook_for_woocommerce()->get_integration();

			if ( $integration->is_configured() ) {
				$data['status'] = 'configured';
			}

			$data['settingsUrl'] = facebook_for_woocommerce()->get_settings_url();
			$data['docsUrl']     = facebook_for_woocommerce()->get_documentation_url();
		}

		return $data;
	}

	/**
	 * Get Pinterest extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_pinterest_extension_data() {
		$slug = 'pinterest-for-woocommerce';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/pinterest.svg', WC_ADMIN_PLUGIN_FILE );

		// TODO: Finalise docs url.
		$data['docsUrl'] = 'https://woocommerce.com/document/pinterest-for-woocommerce/?utm_medium=product';

		if ( 'activated' === $data['status'] && class_exists( 'Pinterest_For_Woocommerce' ) ) {
			$pinterest_onboarding_completed = Pinterest_For_Woocommerce()::is_setup_complete();
			if ( $pinterest_onboarding_completed ) {
				$data['status']      = 'configured';
				$data['settingsUrl'] = admin_url( 'admin.php?page=wc-admin&path=/pinterest/settings' );
			} else {
				$data['settingsUrl'] = admin_url( 'admin.php?page=wc-admin&path=/pinterest/landing' );
			}
		}

		return $data;
	}

	/**
	 * Get Google extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_google_extension_data() {
		$slug = 'google-listings-and-ads';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/google.svg', WC_ADMIN_PLUGIN_FILE );

		if ( 'activated' === $data['status'] && function_exists( 'woogle_get_container' ) && class_exists( '\Automattic\WooCommerce\GoogleListingsAndAds\MerchantCenter\MerchantCenterService' ) ) {

			$merchant_center = woogle_get_container()->get( \Automattic\WooCommerce\GoogleListingsAndAds\MerchantCenter\MerchantCenterService::class );

			if ( $merchant_center->is_setup_complete() ) {
				$data['status']      = 'configured';
				$data['settingsUrl'] = admin_url( 'admin.php?page=wc-admin&path=/google/settings' );
			} else {
				$data['settingsUrl'] = admin_url( 'admin.php?page=wc-admin&path=/google/start' );
			}

			$data['docsUrl'] = 'https://woocommerce.com/document/google-listings-and-ads/?utm_medium=product';
		}

		return $data;
	}

	/**
	 * Get Hubspot extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_hubspot_extension_data() {
		$slug = 'hubspot-for-woocommerce';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/hubspot.svg', WC_ADMIN_PLUGIN_FILE );

		if ( 'activated' === $data['status'] && class_exists( '\Hubwoo' ) ) {

			// Use same check as HubWoo admin.
			if ( \Hubwoo::is_setup_completed() ) {
				$data['status'] = 'configured';
			}

			$data['settingsUrl'] = admin_url( 'admin.php?page=hubwoo' );
			$data['docsUrl']     = 'https://docs.makewebbetter.com/hubspot-integration-for-woocommerce/';
		}

		return $data;
	}

	/**
	 * Get Amazon / Ebay extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_amazon_ebay_extension_data() {
		$slug = 'woocommerce-amazon-ebay-integration';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/amazon-ebay.svg', WC_ADMIN_PLUGIN_FILE );

		if ( 'activated' === $data['status'] && class_exists( '\CodistoConnect' ) ) {

			$codisto_merchantid = get_option( 'codisto_merchantid' );

			// Use same check as codisto admin tabs.
			if ( is_numeric( $codisto_merchantid ) ) {
				$data['status'] = 'configured';
			}

			$data['settingsUrl'] = admin_url( 'admin.php?page=codisto-settings' );
			$data['docsUrl']     = 'https://woocommerce.com/document/multichannel-for-woocommerce-google-amazon-ebay-walmart-integration/?utm_medium=product';
		}

		return $data;
	}

	/**
	 * Get MailPoet extension data.
	 *
	 * @return array|bool
	 */
	protected static function get_mailpoet_extension_data() {
		$slug = 'mailpoet';

		if ( ! PluginsHelper::is_plugin_installed( $slug ) ) {
			return false;
		}

		$data         = self::get_extension_base_data( $slug );
		$data['icon'] = plugins_url( 'images/marketing/mailpoet.svg', WC_ADMIN_PLUGIN_FILE );

		if ( 'activated' === $data['status'] && class_exists( '\MailPoet\API\API' ) ) {
			$mailpoet_api = \MailPoet\API\API::MP( 'v1' );

			if ( ! method_exists( $mailpoet_api, 'isSetupComplete' ) || $mailpoet_api->isSetupComplete() ) {
				$data['status']      = 'configured';
				$data['settingsUrl'] = admin_url( 'admin.php?page=mailpoet-settings' );
			} else {
				$data['settingsUrl'] = admin_url( 'admin.php?page=mailpoet-newsletters' );
			}

			$data['docsUrl']    = 'https://kb.mailpoet.com/';
			$data['supportUrl'] = 'https://www.mailpoet.com/support/';
		}

		return $data;
	}


	/**
	 * Get an array of basic data for a given extension.
	 *
	 * @param string $slug Plugin slug.
	 *
	 * @return array|false
	 */
	protected static function get_extension_base_data( $slug ) {
		$status      = PluginsHelper::is_plugin_active( $slug ) ? 'activated' : 'installed';
		$plugin_data = PluginsHelper::get_plugin_data( $slug );

		if ( ! $plugin_data ) {
			return false;
		}

		return [
			'slug'        => $slug,
			'status'      => $status,
			'name'        => $plugin_data['Name'],
			'description' => html_entity_decode( wp_trim_words( $plugin_data['Description'], 20 ) ),
			'supportUrl'  => 'https://woocommerce.com/my-account/create-a-ticket/?utm_medium=product',
		];
	}

}
