/*
	Pages list, used in asp..js & controls/nav/navigation.js
*/

import Home from './home/home.js';
import Portfolio from './portfolio/portfolio.js';
import Resume from './resume/resume.js';
import Music from './music/music.js';

const _pages = [
	Home,
	Resume,
	Portfolio,
	Music
];

export {
	_pages as PagesList
}