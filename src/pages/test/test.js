import React from 'react';
import './test.css';

export default class TestPage extends React.Component
{
	static defaultProps = {
		Title: "Interview & Testing Questions",
		LinkTitle: "Interview & Testing Questions",
		Href: "/test-questions/"
	};
constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );
		document.title = this.Title;
		return;
	};
	Solution_ComputePolygonArea( n )
	{
		let box = ( n + ( n - 1 ) );
		let squared = ( box * box );
		let area = Math.ceil( squared / 2 ) + n - ( n );
		console.debug( "n", n, "box", box, "squared", squared, "area", area );
		return area;
	};
	render()
	{
		console.debug( "Compute the polygon area using random grids:\n 2 = 3x3 9, 5; 3 = 5x5 25, 13; 4 = 7x7 49, 25" );
		this.Solution_ComputePolygonArea( 1 );
		this.Solution_ComputePolygonArea( 2 );
		this.Solution_ComputePolygonArea( 3 );
		this.Solution_ComputePolygonArea( 4 );
		this.Solution_ComputePolygonArea( 5 );
		this.Solution_ComputePolygonArea( 6 );
		this.Solution_ComputePolygonArea( 7 );
		this.Solution_ComputePolygonArea( 8 );
		this.Solution_ComputePolygonArea( 9 );
		this.Solution_ComputePolygonArea( 10 );
		this.Solution_ComputePolygonArea( 99 );
		this.Solution_ComputePolygonArea( 101 );
		this.Solution_ComputePolygonArea( 500 );
		this.Solution_ComputePolygonArea( 999 );
		this.Solution_ComputePolygonArea( 1000 );

		return (
			<div className="page-layout padding30">
				<div className="header centered">{ this.props.Title }</div>
				<div className="centered">Open Browser Dev Tools to see questions and answers.</div>
			</div>
		);
	};
};