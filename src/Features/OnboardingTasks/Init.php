<?php
/**
 * WooCommerce Onboarding Tasks
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-admin.
 */

namespace Automattic\WooCommerce\Admin\Features\OnboardingTasks;

use \Automattic\WooCommerce\Admin\Loader;
use Automattic\WooCommerce\Admin\API\Reports\Taxes\Stats\DataStore as TaxDataStore;
use Automattic\WooCommerce\Admin\Features\OnboardingTasks\DeprecatedOptions;
use Automattic\WooCommerce\Admin\Features\OnboardingTasks\Tasks\Appearance;
use Automattic\WooCommerce\Admin\Features\OnboardingTasks\Tasks\Products;
use Automattic\WooCommerce\Admin\Features\OnboardingTasks\Tasks\Tax;
use Automattic\WooCommerce\Admin\PluginsHelper;

/**
 * Contains the logic for completing onboarding tasks.
 */
class Init {
	/**
	 * Class instance.
	 *
	 * @var OnboardingTasks instance
	 */
	protected static $instance = null;

	/**
	 * Get class instance.
	 */
	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 */
	public function __construct() {
		DeprecatedOptions::init();
		TaskLists::init();

		if ( ! is_admin() ) {
			return;
		}

		// Old settings injection.
		// Run after Onboarding.
		add_filter( 'woocommerce_components_settings', array( __CLASS__, 'component_settings' ), 30 );
		// New settings injection.
		add_filter( 'woocommerce_admin_shared_settings', array( $this, 'component_settings' ), 30 );
	}

	/**
	 * Get task item data for settings filter.
	 *
	 * @return array
	 */
	public static function get_settings() {
		$settings            = array();
		$wc_pay_is_connected = false;
		if ( class_exists( '\WC_Payments' ) ) {
			$wc_payments_gateway = \WC_Payments::get_gateway();
			$wc_pay_is_connected = method_exists( $wc_payments_gateway, 'is_connected' )
				? $wc_payments_gateway->is_connected()
				: false;
		}

		$settings['automatedTaxSupportedCountries'] = Tax::get_automated_support_countries();
		$settings['hasHomepage']                    = Appearance::has_homepage();
		$settings['hasProducts']                    = Products::has_products();
		$settings['stylesheet']                     = get_option( 'stylesheet' );
		$settings['taxJarActivated']                = class_exists( 'WC_Taxjar' );
		$settings['avalaraActivated']               = PluginsHelper::is_plugin_active( 'woocommerce-avatax' );
		$settings['themeMods']                      = get_theme_mods();

		return $settings;
	}

	/**
	 * Add task items to component settings.
	 *
	 * @param array $settings Component settings.
	 * @return array
	 */
	public function component_settings( $settings ) {
		// Bail early if not on a wc-admin powered page, or task list shouldn't be shown.
		if (
			! \Automattic\WooCommerce\Admin\Loader::is_admin_page() ||
			! count( TaskLists::get_visible() )
		) {
			return $settings;
		}

		// If onboarding isn't enabled this will throw warnings.
		if ( ! isset( $settings['onboarding'] ) ) {
			$settings['onboarding'] = array();
		}

		$settings['onboarding'] = array_merge(
			$settings['onboarding'],
			array(
				'tasksStatus' => self::get_settings(),
			)
		);

		return $settings;
	}
}
