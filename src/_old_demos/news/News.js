import React, { Component } from 'react';
import NewSingle from './NewSingle';
import Error from './Error';

//	https://newsapi.org/register
//	!NewsApiKey
//	b39e11c6fae74106afed4d788d7e2eb8
class News extends Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			news: [],
			error: false,
		};
	}

	componentDidMount() 
	{
		const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=b39e11c6fae74106afed4d788d7e2eb8`;

		fetch( url )
			.then( ( response ) =>
			{
				return response.json();
			} )
			.then( ( data ) =>
			{
				this.setState( {
					news: data.articles
				} )
			} )
			.catch( ( error ) =>
			{
				this.setState( {
					error: true
				} )
			} );

		return;
	}

	renderItems()
	{
		console.debug( "renderItems", this.state.error, this.state.news );

		if ( this.state.error === false)
		{
			return this.state.news.map( ( item, index ) => (
				<NewSingle key={index} data-url={item.url} item={item} />
			) );
		} else
		{
			return <Error />
		}
	}

	render()
	{
		return (
			<div className="row">
				{this.renderItems()}
			</div>
		);
	}
}

export default News;
