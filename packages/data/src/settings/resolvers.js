/**
 * External dependencies
 */
import { apiFetch, dispatch as oldDispatch } from '@wordpress/data-controls';
import { controls } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../constants';
import { STORE_NAME } from './constants';
import { updateSettingsForGroup, updateErrorForGroup } from './actions';

const dispatch =
	controls && controls.dispatch ? controls.dispatch : oldDispatch;

function settingsToSettingsResource( settings ) {
	return settings.reduce( ( resource, setting ) => {
		resource[ setting.id ] = setting.value;
		return resource;
	}, {} );
}

export function* getSettings( group ) {
	yield dispatch( STORE_NAME, 'setIsRequesting', group, true );

	try {
		const url = NAMESPACE + '/settings/' + group;
		const results = yield apiFetch( {
			path: url,
			method: 'GET',
		} );

		const resource = settingsToSettingsResource( results );

		return updateSettingsForGroup( group, { [ group ]: resource } );
	} catch ( error ) {
		return updateErrorForGroup( group, null, error.message );
	}
}

export function* getSettingsForGroup( group ) {
	return getSettings( group );
}
