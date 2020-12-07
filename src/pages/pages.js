/*
	Pages list, used in asp..js & controls/nav/navigation.js
*/

import Home from './home/home.js';
import Resume from './resume/resume.js';
import Music from './music/music.js';
import DemosPage from './demos/demos.js';
import TeleSpecDemo from './svg-tele-spec/svg-tele-spec.js';
import MovieStoreExtension from './movie-works-demo/movieworks.js';
import GuitarApp from './guitar-app/guitar-app.js';
// import GuitarStoreExtension from './guitar-store/guitar-store.js';
//	import TestPage2 from './test2/test2.js';

const _pages = [
    {
        path: Home.defaultProps.Href,
        component: Home
    },
    {
        path: Resume.defaultProps.Href,
        component: Resume
    },
    {
        path: DemosPage.defaultProps.Href,
        component: DemosPage,
        routes: [
            {
                path: TeleSpecDemo.defaultProps.Href,
                component: TeleSpecDemo
            },
            {
                path: MovieStoreExtension.defaultProps.Href,
                component: MovieStoreExtension
            },
            {
                path: GuitarApp.defaultProps.Href,
                component: GuitarApp
            },

            //{
            //    path: GuitarStoreExtension.defaultProps.Href,
            //    component: GuitarStoreExtension
            //},
        ]
    },
    {
        path: Music.defaultProps.Href,
        component: Music
    },
];

export {
	_pages as PagesList
}