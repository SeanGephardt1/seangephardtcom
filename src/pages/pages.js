/* Pages list, used in app.js & controls/nav/navigation.js*/
import Home from './home/home.js';
import Resume from './resume/resume.js';
import Music from './music/music.js';
import DemosPage from './demos/demos.js';
import AzureCaseStudyDemo from './azure-ux/azure-case-study.js';
import MovieStoreExtension from './movie-works-demo/movieworks.js';
import TeleSpecDemo from './svg-tele-spec/svg-tele-spec.js';
import Html5CanvasDemo from './canvas-demo/canvas-demo.js';
//  import TestPage from './test/test.js';
//  import GuitarApp from './guitar-app/guitar-app.js';
//  import GuitarStoreExtension from './guitar-store/guitar-store.js';

const _p = [
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
                path: AzureCaseStudyDemo.defaultProps.Href,
                component: AzureCaseStudyDemo
            },            
            {
                path: MovieStoreExtension.defaultProps.Href,
                component: MovieStoreExtension
            },
            {
                path: TeleSpecDemo.defaultProps.Href,
                component: TeleSpecDemo
            },
            {
                path: Html5CanvasDemo.defaultProps.Href,
                component: Html5CanvasDemo
            },
            //{
            //    path: GuitarApp.defaultProps.Href,
            //    component: GuitarApp
            //},
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
    //{
    //    path: TestPage.defaultProps.Href,
    //    component: TestPage
    //}
];

export {
	_p as PagesList
}