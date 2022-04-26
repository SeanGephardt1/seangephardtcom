import React from 'react';
import './web-worker-demo.css';

export default class WebWorkerDemo extends React.Component
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
      apiRunning: false,
      apiPagingIndex: 1,
      apiPageSize: 5,
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
      _self.setState( {
        apiRunning: false,
        apiPagingIndex: 1,
        apiPageSize: 5,
        apiMessage: undefined,
        countMessages: [],
        cmRunning: false
      } );
      // throw new Error( event.message );
    };
    this.webWorkerTask.onmessage = function ( event )
    { //  console.debug( "this.webWorkerTask.onmessage", event.data.action );
      switch ( event.data.action )
      {
        case _self.props.WorkerActions.APIs:
          { // console.debug( _self.props.WorkerActions.APIs, 'message event.data', event.data );
            _self.setState( {
              apiRunning: false,
              apiMessage: event.data
            } );
            break;
          }
        case _self.props.WorkerActions.QuickListStart:
          { //  console.debug( 'count message event.data', event.data );            
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

  OnClick_Fetch_API_Data()
  { //  console.debug( "getGitHibCommits()", this.props.Workers.Git );
    //  this.CreateWebWorker( this.props.Workers.Main );
    this.webWorkerTask.postMessage( {
      action: this.props.WorkerActions.APIs,
      sent: new Date().toISOString(),
      page: this.state.apiPagingIndex,
      count: this.state.apiPageSize
    } );
    this.setState( {
      apiRunning: true
    } );
    return;
  };
  OnClick_Clear_API_Messages( e )
  {
    this.setState( {
      apiRunning: false,
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
      count: this.state.apiPageSize
    } );

    this.setState( {
      apiPagingIndex: _new_idx
    } );
    return;
  };

  OnClick_StartTimer()
  { //  console.debug( "startTimer()", this.webWorkerTask );
    //  this.CreateWebWorker( this.props.Workers.Main );
    this.webWorkerTask.postMessage( {
      action: this.props.WorkerActions.QuickListStart,
      client_id: "MESSAGE-ID-ABC-111",
      client_message: 'Testing this web worker in global script scope.',
      numberOfResponses: 5,
      timer_value: 500
    } );

    this.setState( {
      cmRunning: true,
      countMessages: []
    } );
    return;
  };
  OnClick_StopTimer()
  { //  console.debug( "stopTimer()", this.webWorkerTask);
    this.webWorkerTask.postMessage( {
      action: this.props.WorkerActions.QuickListStop
    } );
    //  this.webWorkerTask.terminate();

    this.setState( { cmRunning: false } );
    return;
  };
  OnClick_ClearCountMessage()
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
      <div className="page-layout padding30">
        <div className="header centered">{ this.props.Title }</div>

        { /* Worker - "git" action */ }
        <div className="ww-sample-panel">
          <div className="ww-sample-header-panel">
            This example retreives a list of public APIs from
            <a
              tabIndex="0"
              target="_new"
              href="https://api.publicapis.org"
              title="Public API for Public APIs"> Public API for Public APIs </a>
            using the JavaScript Fetch object and then caches the result set as an object for performant paging of those results.
          </div>
          <div className="ww-sample-tool-panel">
            <button
              tabIndex="0"
              className="app-btn"
              onClick={ this.OnClick_Fetch_API_Data.bind( this ) }
              onKeyPress={ this.OnClick_Fetch_API_Data.bind( this ) }
              disabled={ this.state.apiRunning === true }>Fetch API data</button>
            <button
              tabIndex="0"
              className="app-btn"
              onClick={ this.OnClick_Clear_API_Messages.bind( this ) }
              onKeyPress={ this.OnClick_Clear_API_Messages.bind( this ) }
              disabled={ this.state.apiMessage === undefined }>Clear</button>
          </div>
          {
            this.state.apiMessage === undefined &&
            <div className="ww-sample-layout-panel">No results at this time.</div>
          }
          {
            this.state.apiMessage !== undefined &&
            <div className="ww-sample-layout-panel">
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
                <table cellPadding="0" cellSpacing="0">
                  <thead>
                    <tr>
                      <td>API</td>
                      <td>Description</td>
                      <td>Category</td>
                      <td>Authentication Type</td>
                      <td>HTTPS supported</td>
                      <td>CORS policy</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.apiMessage.entries.map( ( item, idx ) => (
                        <tr key={ idx } title={ "TESTING" }>
                          <td>
                            <a
                              tabIndex="0"
                              target="_new"
                              href={ item.Link }
                              title={ 'API: ' + item.API + '\n' + item.Description }>{ item.API }</a>
                          </td>
                          <td>{ item.Description }</td>
                          <td>{ item.Category }</td>
                          <td>{ item.Auth === "" ? "Not provided" : item.Auth.toString() }</td>
                          <td>{ item.HTTPS === true ? 'Yes' : 'No' }</td>
                          <td>{ item.Cors }</td>
                        </tr>
                      ) )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>

        { /* Worker - "count" action */ }
        <div className="ww-sample-panel">
          <div className="ww-sample-header-panel">
            This example posts a Web Worker message that contains a JSON object which defines the number of results to produce, a sample text message and a timing interval which tells the Web Worker how often to send return messages to the page.
          </div>
          <div className="ww-sample-tool-panel">
            <button
              tabIndex="0"
              className="app-btn"
              onClick={ this.OnClick_StartTimer.bind( this ) }
              disabled={ this.state.cmRunning === true }>Send timer data</button>
            <button
              tabIndex="0"
              className="app-btn"
              onClick={ this.OnClick_StopTimer.bind( this ) }
              disabled={ this.state.cmRunning === false }>Stop</button>
            <button
              tabIndex="0"
              className="app-btn"
              onClick={ this.OnClick_ClearCountMessage.bind( this ) }
              disabled={ this.state.countMessages.length === 0 }>Clear</button>
          </div>
          {
            this.state.countMessages.length === 0 &&
            <div className="ww-sample-layout-panel">No results at this time.</div>
          }
          {
            this.state.countMessages.length > 0 &&
            this.state.countMessages.map( ( item, idx ) => (
              <div key={ idx } className="ww-count-panel">
                <div><span className="bold-700 margin-right-10">ACTION:</span> { item.action }</div>
                <div><span className="bold-700 margin-right-10">DATA.index:</span> { item.data.index }</div>
                <div><span className="bold-700 margin-right-10">DATA.id:</span> { item.data.id }</div>
                <div><span className="bold-700 margin-right-10">DATA.message:</span> { item.data.message }</div>
                <div><span className="bold-700 margin-right-10">DATA.timestamp:</span> { new Date( item.data.timestamp ).toLocaleString() }</div>
                <div><span className="bold-700 margin-right-10">DATA.clientmessage:</span> { JSON.stringify( item.data.clientmessage) }</div>
              </div>
            ) )
          }
        </div>

      </div>
    );
  }
};
