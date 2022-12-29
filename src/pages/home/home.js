import React from 'react';
import HomeSvg from '../../controls/home-svg/home-svg.js';
import './home.css';

export default class Home extends React.Component
{
  static defaultProps = {
    Title: "Sean Gephardt - Design, Develop, Deploy",
    LinkTitle: "Sean Gephardt",
    Href: "/",
    Description: "Generic Page Description for This Demo Page!.For my web site portfolio and beyond and the internets. Lorum Ipsum.",
    Icon: undefined
  };
  constructor ( props )
  {
    super( props );
    this.Title = this.props.Title;
    this.LinkTitle = this.props.LinkTitle;
    this.Href = this.props.Href;
    this.state = { debug: false };
    document.title = this.Title;
    return;
  };
  componentDidMount()
  {	//	console.debug( "Home.componentDidMount()");
    return;
  }
  componentWillUnmount()
  {	//	console.debug( "Home.componentWillUnmount()" );
    return;
  };
  render()
  {
    return (
      <div className="page-layout">
        <HomeSvg />
        <div className="home-panel">
          <h1 className="home-hello">Welcome!</h1>
          <div>My recent work has been focused on creating high fidelity, interactive prototypes of user experience scenarios utilizing HTML, CSS, SVG & JavaScript, that go beyond wireframes or static mock ups. This methodology allows researchers to collect succinct quantitative & qualitative data on expectations from the customers who will be using a product that the experience is designed for. It's also valuable after research has been completed as a way to provide engineering a preliminary code base to integrate and implement the scenario and features. For example, this entire portfolio site is being created using the ReactJs framework & related JavaScript libraries, as well as HTML 5 & CSS 3.
          </div>
        </div>
      </div>
    );
  }
};
