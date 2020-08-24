// Pages list, used in asp..js & controls/nav/navigation.js

import Home from './home/home.js';
import Resume from './resume/resume.js';
import Portfolio from './portfolio/portfolio.js';
import Music from './music/music.js';
//import GuitarApp from './guitar-app/guitar-app.js';
//import TestPage from './test/test.js';
import Settings from './settings/settings.js'


const _pages = [
	Home,
	Resume,
	Portfolio,
	Music,
	//GuitarApp,
	Settings
];

export {
	_pages as PagesList
}