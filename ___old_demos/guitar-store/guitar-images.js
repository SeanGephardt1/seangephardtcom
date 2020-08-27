import FenderOne1 from './images/fender-one-1.jpg';
import FenderOne2 from './images/fender-one-2.jpg';
import FenderOne5 from './images/fender-one-5.jpg';
import FenderOne6 from './images/fender-one-6.jpg';
import FenderOne9 from './images/fender-one-9.jpg';
import FenderOne10 from './images/fender-one-10.jpg';
import FenderOne11 from './images/fender-one-11.jpg';
import FenderOne12 from './images/fender-one-12.jpg';
import FenderOne13 from './images/fender-one-13.jpg';
import FenderOne14 from './images/fender-one-14.jpg';

import FenderOneTh from './images/fender-one-th.jpg';

import Gibson from './images/gibson.jpg';
import GibsonTh from './images/gibson-th.jpg';
import Martin from './images/martin.jpg';
import MartinTh from './images/martin-th.jpg';


const imageCollections = [
	{
		name: "fender", thumbNail: FenderOneTh, images: [
			FenderOne1,
			FenderOne2,
			FenderOne5,
			FenderOne6,
			FenderOne9,
			FenderOne10,
			FenderOne11,
			FenderOne12,
			FenderOne13,
			FenderOne14,
			FenderOne1,
			FenderOne2,
			FenderOne5,
			FenderOne6,
			FenderOne9,
			FenderOne10,
			FenderOne11,
			FenderOne12,
			FenderOne13,
			FenderOne14
		]
	},
	{
		name: "gibson", thumbNail: GibsonTh, images: [Gibson]
	},
	{
		name: "martin", thumbNail: MartinTh, images: [Martin]
	},
];

export
{
	imageCollections as ImageCollections
};