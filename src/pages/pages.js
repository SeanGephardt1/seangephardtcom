/*
	Pages list, used in asp..js & controls/nav/navigation.js
*/

import Home from './home/home.js';
import Resume from './resume/resume.js';
import Music from './music/music.js';
import ControlsDemo from './controls-demo/controls-demo.js';
//	import Portfolio from './portfolio/portfolio.js';
//	import TestPage2 from './test2/test2.js';
//	import { MovieStoreExtension } from './movie-works/movie-works.js';
//	import { GuitarStoreExtension } from './guitar-store/guitar-store.js';


const _pages = [
	Home,
	Resume,
	//	ControlsDemo,
	Music
];

export {
	_pages as PagesList
}