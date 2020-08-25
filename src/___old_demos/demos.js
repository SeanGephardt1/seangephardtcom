// GLOBAL EXTENSIONS LIST
import { AboutExtension as About } from './about/about.js';
import { ResumeExtension as Resume } from './resume/resume.js';
import { PortfolioExtension as Portfolio } from './portfolio/portfolio.js';
import { MusicExtension as Music } from './music/music.js';
//	import { MovieStoreExtension as MovieStore } from './movie-works/movie-works.js';
import { TestExt } from './test/test.js';


//import { GuitarStoreExtension as GuitarStore } from './guitar-store/guitar-store.js';
//import { MusicPlayerExtension as MusicPlayer } from './music-player/music-player.js';
//import { MovieIntroExtension as MovieIntro } from './movie-intro/movie-intro.js';

// EXTENSION SPECIFIC CONTEXT PANELS
const _demos = [
	About,
	Resume,
	Portfolio,
	Music,
	//	MovieStore,
	//	GuitarStore,
	//	MusicPlayer,
	//	MovieIntro,
	TestExt
];

export {
	_demos as DemosList
}