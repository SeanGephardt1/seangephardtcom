/*
	Pages list, used in asp..js & controls/nav/navigation.js
*/

import Home from './home/home.js';
import Portfolio from './portfolio/portfolio.js';
import Resume from './resume/resume.js';
import Music from './music/music.js';
//	import TestPage from './test/test.js';

const _pages = [
	Home,
	Resume,
	Portfolio,
	Music,
	//	TestPage
];

export {
	_pages as PagesList
}