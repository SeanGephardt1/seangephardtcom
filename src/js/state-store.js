// TRYING TO MAKE MY OWN GLOBAL SCOPED STATE STORAGE

export default class StateStore
{
	static States = {};
	static List = function ()
	{
		console.debug( "StateStore.List()" );

		Object.entries( StateStore.States ).forEach( ( item, index ) => 
		{
			console.log( index, item[0], item[1] );
		});
		return;
	};
	static AddState = function ( key, value )
	{
		//	console.debug( "AddState()", key, value );
		let _frozen_key = Object.freeze( key );
		StateStore.States[_frozen_key] = value;
		//	console.debug( "AddState::StateStore.States", StateStore.States );
		return;
	};
	static RemoveState = function ( key )
	{
		//	StateStore.DefaultConfiguration.push( stateObject );
		console.debug( "RemoveState::StateStore.DefaultConfiguration", StateStore.States );
		return;
	};
	static UpdateState = function ( key, value )
	{
		//	StateStore.DefaultConfiguration.push( stateObject );
		console.debug( "RemoveState::StateStore.DefaultConfiguration", StateStore.States );
		return;
	};
}


//	let _found = false;
//Object.entries( StateStore.States ).forEach( ( item, index ) => 
//{
//	//	console.log( index, item[0], item[1] );
//	if ( item[0] === key )
//	{
//		_found = true;
//	}
//});