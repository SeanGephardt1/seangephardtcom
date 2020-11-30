import { ImageCollections } from './guitar-images.js';

const _guitar_conditions = [
	"Excellent",
	"Very good",
	"Good",
	"Average",
	"Needs love"
];
const _guitar_types = [
	"electric",
	"acoustic",
	"lap steel",
	"pedal steel",
	"ukelele",
	"banjo"
];
const _guitar_colors = [
"Black","Two tone sunburst", "Three tone sunburst", "Natural", "Butterscotch blonde","Transparent white","Candy apple red"
];
const _guitar_brands_and_models = [
	{
		name: "Fender", models: [
			"Custom Shop Stratocaster",
			"Custom Shop Telecaster ",
			"Custom Shop Esquire",
			"Custom Shop Double Esquire",
			"Custom Shop Nocaster",
			"Custom Shop Nocaster Thinline",
			"Custom Shop Broadcaster",
			"Stratocaster",
			"Stratocaster Elite",
			"Stratocaster Ultra",
			"Stratocaster Plus",
			"Stratocaster Deluxe",
			"70th Anniversary Limited Edition Broadcaster",
			"Telecaster",
			"Telecaster Deluxe",
			"Telecaster Plus",
			"Telecaster Ultra",
			"Telecaster Cabronita",
			"Jazzmaster",
			"Jazzmaster Ultra",
			"Jazzmaster Deluxe",
			"Jazz Bass",
			"Jazz Ultra Bass ",
			"Jazz Deluxe Bass ",
			"Precision Bass",
			"Precision Ultra Bass",
			"Precision Deluxe Bass",
		]
	},
	{
		name: "Gibson", models: [
			"Les Paul Special",
			"Les Paul Standard",
			"Les Paul Custom",
			"ES-335",
			"ES-345",
			"ES-355",
			"Firebird",
			"SG",
			"Flying V",
			"Hummingbird",
			"Dove",
			"Custom Shop Les Paul Special",
			"Custom Shop Les Paul Standard",
			"Custom Shop Les Paul Custom",
			"Custom Shop ES-335",
			"Custom Shop ES-345",
			"Custom Shop ES-355",
			"Custom Shop Firebird",
			"Custom Shop SG",
			"Custom Shop Flying V",
			"Custom Shop Hummingbird",
			"Custom Shop Dove"
		]
	},
	{
		name: "Martin", models: [
			"D-18","D-28","000-28","00-28","00-18","HD-28","D-35","D-42"
		]
	},
];

class GuitarStoreDataGenerator
{	
	static GenerateRandomDateAdded()
	{
		let _base_date = new Date();

		let _scope_date = new Date(
			(_base_date.getFullYear() - Math.round( Math.random() * 1 ) ),
			Math.round( Math.random() * 11 ),
			Math.round( Math.random() * 31 )
		);

		if ( _scope_date > _base_date )
		{	//	console.debug( "ouch needs new date" );
			_scope_date = new Date(
				_base_date.getFullYear(),
				Math.round( Math.random() * _base_date.getMonth() ),
				Math.round( Math.random() * _base_date.getDay() )
			);
		}
		//	console.debug( "_base_date", _base_date, "_scope_date", _scope_date );
		return _scope_date;
	};
	static GenerateGuitarYear()
	{
		let _year = new Date().getFullYear() - Math.round( Math.random() * 70 );
		return _year;
	};
	static GenerateMsrpPrice()
	{
		let _temp = "$" + ( Math.random() * 999.99 ).toFixed( 2 );
		return _temp;
	};
	static GenerateSalePrice()
	{
		let _temp = "$" + ( Math.random() * 899.99 ).toFixed( 2 );
		return _temp;
	};

	static FormatDate(date)
	{	//	console.debug("FormatDate", date)

		let _this_date = new Date( date );
		let _temp;
		let _day_name;
		let _temp_date = _this_date.toString().split( " " );

		switch ( _this_date.getDay() )
		{
			case 0: {
				_day_name = "Sunday";
				break;
			}
			case 1: {
				_day_name = "Monday";
				break;
			}
			case 2: {
				_day_name = "Tuesday";
				break;
			}
			case 3: {
				_day_name = "Wednesday";
				break;
			}
			case 4: {
				_day_name = "Thursday";
				break;
			}
			case 5: {
				_day_name = "Friday";
				break;
			}
			case 6: {
				_day_name = "Saturday";
				break;
			}
			default: {
				_day_name = "Haxorday";
				break;
			}
		}

		_temp = _day_name + ", " + _temp_date[1] + ". " + _temp_date[2] + ", " + _temp_date[3]
		//	console.debug( "_temp", _temp );
		return _temp;
	};

	static GenerateGuitarInventory()
	{
		const _row_count = 136;
		let _return_dataset = [];

		for ( let i = 0; i < _row_count; i++ )
		{
			// guitar store bump
			let _storeBump = ( i < 5 ) ? true : false;
			let _freeShipping = Math.round( Math.random() ) === 0 ? false : true;

			// guitar types
			let _rnd_guitar_type = Math.round( Math.random() * _guitar_types.length - 1 );
			if ( _rnd_guitar_type === -1 || _rnd_guitar_type === -0 )
			{	//	console.debug( "_rnd_guitar_type", _rnd_guitar_type );
				_rnd_guitar_type = 0;
				//	console.debug( "_rnd_guitar_type-fixed", _rnd_guitar_type);
			}

			// guitar brands & models
			let _rnd_guitar_brand = Math.round( Math.random() * _guitar_brands_and_models.length - 1 );
			if ( _rnd_guitar_brand === -1 || _rnd_guitar_brand === -0 )
			{	
				_rnd_guitar_brand = 0;	
			}
			//	console.debug( "_guitar_brands_and_models", _guitar_brands_and_models[_rnd_guitar_brand].name );

			let _rnd_guitar_brand_model = Math.round( Math.random() * _guitar_brands_and_models[_rnd_guitar_brand].models.length - 1 );
			if ( _rnd_guitar_brand_model === -1 || _rnd_guitar_brand_model === -0 )
			{	
				_rnd_guitar_brand_model = 0;	
			}
			//	console.debug( "_rnd_guitar_brand_model", _guitar_brands_and_models[_rnd_guitar_brand].models[_rnd_guitar_brand_model] );

			let _thumbnail = ImageCollections.find( function ( value, index )
			{	//	console.log( index, _guitar_brands_and_models[_rnd_guitar_brand].name.toLowerCase(), value.name.toLowerCase() );
				return value.name.toLowerCase() === _guitar_brands_and_models[_rnd_guitar_brand].name.toLowerCase() ;
			} );

			// guitar pricing
			let _rnd_color = Math.round( Math.random() * _guitar_colors.length - 1 );
			if ( _rnd_color === -1 || _rnd_color === -0 )
			{	
				_rnd_color = 0;	
			}

			let _onSale = Math.round( Math.random() ) === 0 ? false : true;
			let _rnd_sale = 0;
			let _rbd_msrp = parseFloat( Math.round( Math.random() * 9 ) + "999.99" );
			//console.debug( "_rnd_msrp_thousand", _rnd_msrp_thousand );

			if ( _onSale === true )
			{
				_rnd_sale = _rbd_msrp - 500;
			}
			else if ( _onSale === false )
			{
				_rnd_sale = 0.00;
			}
			//	console.debug( "_rbd_msrp", _rbd_msrp, "_rnd_sale", _rnd_sale, "_onSale", _onSale );

			// guitar condition
			let _rnd_condition = Math.round( Math.random() * _guitar_conditions.length - 1 );
			if ( _rnd_condition === -1 || _rnd_condition === -0 )
			{	
				_rnd_condition = 0;	
			}

			let _row = {
				guid: i,
				key: i + 1,
				selected: false,
				addToCart: false,
				addedToWatchList: false,
				storeBump: _storeBump,
				onSale: _onSale,
				freeShipping: _freeShipping,
				thumbnail: _thumbnail.thumbNail,	// GuitarDemoThumbnail,
				images: _thumbnail.images,
				yearMade: GuitarStoreDataGenerator.GenerateGuitarYear(),
				guitarType: _guitar_types[_rnd_guitar_type],
				brandName: _guitar_brands_and_models[_rnd_guitar_brand].name,
				model: _guitar_brands_and_models[_rnd_guitar_brand].models[_rnd_guitar_brand_model],
				modelColor: _guitar_colors[_rnd_color],
				msrpPrice: _rbd_msrp,
				salePrice: _rnd_sale,
				condition: _guitar_conditions[_rnd_condition],
				dateAdded: GuitarStoreDataGenerator.GenerateRandomDateAdded()
			};

			_return_dataset.push( _row );
		}

		// debug filtering
		const _filter_debug_row = {
			guid: _return_dataset.length,
			key: _return_dataset.length + 1,
			selected: false,
			addToCart: false,
			addedToWatchList: false,
			storeBump: true,
			onSale: true,
			freeShipping: true,
			thumbnail: ImageCollections[0].thumbNail,
			images: ImageCollections[0].images,
			yearMade: 1987,
			guitarType: _guitar_types[0],
			brandName: _guitar_brands_and_models[0].name,
			model: _guitar_brands_and_models[0].models[0],
			modelColor: _guitar_colors[0],
			msrpPrice: 1999.99,
			salePrice: 1499.99,
			condition: _guitar_conditions[0],
			dateAdded: GuitarStoreDataGenerator.GenerateRandomDateAdded()
		};
		//	console.debug( "_filter_debug_row", _filter_debug_row );

		_return_dataset.push( _filter_debug_row );
		//	

		//	console.debug( "_return_dataset", JSON.stringify(_return_dataset));
		return _return_dataset;
	};
};

export
{
	_guitar_conditions as GuitarConditions,
	_guitar_types as GuitarTypes,
	_guitar_colors as GuitarColors,
	_guitar_brands_and_models as GuitarBrandsAndModels,
	GuitarStoreDataGenerator 
};