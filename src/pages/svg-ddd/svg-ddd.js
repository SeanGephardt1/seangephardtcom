import React from "react";
import "./svg-ddd.css";

export default class SvgDDD extends React.Component {
  static defaultProps = {
    Title: "Design, Develop, Deploy",
    LinkTitle: "Design, Develop, Deploy",
    Href: "/portfolio/svg-ddd",
  };
  constructor(props) {
    super(props);
    this.Title = this.props.Title || this.defaultProps.Title;
    this.LinkTitle = this.props.LinkTitle || this.defaultProps.LinkTitle;
    this.Href = this.props.Href || this.defaultProps.Href;
    document.title = this.Title;
    return;
  }

  render() {
    console.debug("SvgDDDComponent.render()");
    return (
      <div>
        <div>SVG Design, Develop, Deploy</div>
        <svg></svg>
      </div>
    );
  }
}
