import React from 'react';
import './db-demo.css';

export default class DashboardDemo extends React.Component
{
  static defaultProps = {
    Title: "JavaScript Web Worker Examples",
    LinkTitle: "Web Workers",
    Href: "portfolio/dashboard-demo",
    Icon: "",
    Workers: {
      Main: "./workers/db-demo-worker.js"
    },
    WorkerActions: {
      APIs: "apis",
      QuickListStart: "quickListStart",
      QuickListStop: "quickListStop",

    }
  };
  constructor ( props )
  {
    super( props );
    document.title = this.props.Title;

    this.webWorkerTask = undefined;

    this.state = {
      debug: true,
      apiPagingIndex: 1,
      apiMessage: undefined,
      countMessages: [],
      cmRunning: false
    };
    return;
  };
  CreateWebWorker( strUri )
  {   //  console.debug( "CreateWebWorker", this.props.Workers.Git );
    const _self = this;

    this.webWorkerTask = new Worker( strUri );
    this.webWorkerTask.onerror = function ( event )
    {
      console.error( "this.webWorkerTask.onerror", event );
      throw new Error( event.message );
    };
    this.webWorkerTask.onmessage = function ( event )
    { //  console.debug( "this.webWorkerTask.onmessage", event.data.action );
      switch ( event.data.action )
      {
        case _self.props.WorkerActions.APIs:
          { // console.debug( _self.props.WorkerActions.APIs, 'message event.data', event.data );
            _self.setState( { apiMessage: event.data } );
            break;
          }
        case _self.props.WorkerActions.QuickListStart:
          { //  console.debug('count message event.data', event.data);
            if ( event.data.data === "STOPPED" )
            {
              _self.setState( { cmRunning: false } );
            }
            else
            {
              let _temp_messages = _self.state.countMessages;
              _temp_messages.push( event.data );
              _self.setState( { countMessages: _temp_messages } );
            }
            break;
          }
        default:
          {
            _self.setState( {
              apiMessage: undefined,
              countMessage: undefined,
              cmRunning: false
            } );
          }
      };
      return;
    };
    return;
  };

  GetAPIData()
  { //  console.debug( "getGitHibCommits()", this.props.Workers.Git );
    //  this.CreateWebWorker( this.props.Workers.Main );
    this.webWorkerTask.postMessage( {
      action: this.props.WorkerActions.APIs,
      sent: new Date().toISOString(),
      page: this.state.apiPagingIndex,
      count: 20
    } );
    return;
  };
  ClearGitHibCommits()
  {
    this.setState( {
      apiMessage: undefined,
      apiPagingIndex: 1
    } );
    return;
  };
  OnClick_PageResults( idx, ev )
  { //  console.debug( 'OnClick_PageResults', this.state.apiPagingIndex, idx, this.state.apiMessage, this.webWorkerTask );

    let _new_idx = this.state.apiPagingIndex + idx;

    this.webWorkerTask.postMessage( {
      action: this.props.WorkerActions.APIs,
      sent: new Date().toISOString(),
      page: _new_idx,
      count: 20
    } );

    this.setState( {
      apiPagingIndex: _new_idx
    } );
    return;
  };

  startTimer()
  { //  console.debug( "startTimer()", this.webWorkerTask );
    //  this.CreateWebWorker( this.props.Workers.Main );
    this.webWorkerTask.postMessage( {
      action: this.props.WorkerActions.QuickListStart,
      id: "TEMP ID 9999",
      total: 3,
      data: 'Testing this web worker global script scope.',
      timer_value: 250
    } );

    this.setState( {
      cmRunning: true,
      countMessages: []
    } );
    return;
  };
  stopTimer()
  { //  console.debug( "stopTimer()", this.webWorkerTask);
    this.webWorkerTask.postMessage( {
        action: this.props.WorkerActions.QuickListStop
      } );
    //  this.webWorkerTask.terminate();

    this.setState( { cmRunning: false } );
    return;
  };
  clearCountMessage()
  {
    this.setState( {
      cmRunning: false,
      countMessages: []
    } );
    return;
  };

  componentDidMount()
  {	//	console.debug( "DashboardDemo.componentDidMount()");
    this.CreateWebWorker( this.props.Workers.Main );
    return;
  }
  componentWillUnmount()
  {	//	console.debug( "DashboardDemo.componentWillUnmount()" );
    if ( this.webWorkerTask !== undefined )
    {
      this.webWorkerTask.terminate();
      this.webWorkerTask = undefined;
    }
    return;
  };
  render()
  {
    return (
      <div className="page-layout padding30 ">
        <div className="header centered">{ this.props.Title }</div>

        { /* Worker - "git" action */ }
        <div className="ww-sample-panel">
          <button
            tabIndex="0"
            className="db-app-btn"
            style={ { 'marginRight': '10px' } }
            onClick={ this.GetAPIData.bind( this ) }>Fetch API Data</button>
          <button
            tabIndex="0"
            className="db-app-btn"
            onClick={ this.ClearGitHibCommits.bind( this ) }>Clear</button>
        </div>
        {
          this.state.apiMessage === undefined &&
          <div className="ww-sample-panel">No results at this time</div>
        }
        {
          this.state.apiMessage !== undefined &&
          <div className="ww-layout-panel">
            <div className="ww-api-toolbar-panel">
              <div>
                <button
                  tabIndex="0"
                  className="db-app-btn"
                  onClick={ this.OnClick_PageResults.bind( this, -1 ) }
                  disabled={ this.state.apiPagingIndex === 1 }>Previous Page</button>
              </div>
              <div className="ww-api-tool-centered">
                <span >Page { this.state.apiPagingIndex } of { this.state.apiMessage.pageCount }</span>
              </div>
              <div>
                <button
                  tabIndex="0"
                  className="db-app-btn"
                  onClick={ this.OnClick_PageResults.bind( this, 1 ) }
                  disabled={ this.state.apiPagingIndex === this.state.apiMessage.pageCount }>Next Page</button>
              </div>
            </div>
            <div className="ww-api-toolbar-table-panel">
              <table width="100%" cellPadding="0" cellSpacing="0">
                <thead>
                  <tr>
                    <td>API</td>
                    <td>Auth</td>
                    <td>Category</td>
                    <td>CORS</td>
                    <td>Description</td>
                    <td>HTTPS</td>
                    <td>Link</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.apiMessage.entries.map( ( item, idx ) => (
                      <tr key={ idx }>
                        <td>{ item.API.toString() }</td>
                        <td>{ item.Auth.toString() }</td>
                        <td>{ item.Category }</td>
                        <td>{ item.Cors }</td>
                        <td>{ item.Description }</td>
                        <td>{ item.HTTPS.toString() }</td>
                        <td>
                          <a
                            tabIndex="0"
                            target="_new"
                            href={ item.Link }
                            title={ item.API + '\n' + item.Description }>{ item.API }</a>
                        </td>
                      </tr>
                    ) )
                  }
                </tbody>
              </table>
              {
                //this.state.apiMessage.entries.length > 0 &&
                //this.state.apiMessage.entries.map( ( item, idx ) => (
                //  <div key={ idx } className="ww-count-panel">
                //    <div>API: { item.API }</div>
                //    <div>Auth: { item.Auth.toString() }</div>
                //    <div>Category: { item.Category }</div>
                //    <div>CORS: { item.Cors }</div>
                //    <div>Description: { item.Description }</div>
                //    <div>HTTPS: { item.HTTPS.toString() }</div>
                //    <div>Link: { item.Link }</div>
                //  </div>
                // ) )
              }
            </div>
          </div>
        }

        { /* Worker - "count" action */ }
        <div className="ww-sample-panel">
          <button
            tabIndex="0"
            className="db-app-btn"
            style={ { 'marginRight': '10px' } }
            onClick={ this.startTimer.bind( this ) }
            disabled={ this.state.cmRunning === true }>Start Timer Data</button>
          <button
            tabIndex="0"
            className="db-app-btn"
            style={ { 'marginRight': '10px' } }
            onClick={ this.stopTimer.bind( this ) }
            disabled={ this.state.cmRunning === false }>Stop</button>
          <button
            tabIndex="0"
            className="db-app-btn"
            onClick={ this.clearCountMessage.bind( this ) }
            disabled={ this.state.countMessages.length === 0 }>Clear</button>
        </div>
        {
          this.state.countMessages.length > 0 &&
          this.state.countMessages.map( ( item, idx ) => (
            <div key={ idx } className="ww-count-panel">
              <div>ACTION: { item.action }</div>
              <div>ID: { item.data.id }</div>
              <div>INDEX: { item.data.index }</div>
              <div>TOTAL: { item.data.total }</div>
              <div>DATA: { item.data.data }</div>
              <div>DATE: { item.data.date !== null && new Date( item.data.date ).toISOString() }</div>
            </div>
          ) )
        }
      </div>
    );
  }
};
