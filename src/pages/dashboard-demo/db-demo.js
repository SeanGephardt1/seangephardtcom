import React from 'react';
import './db-demo.css';

export default class DashboardDemo extends React.Component
{
  static defaultProps = {
    Title: "JavaScript Web Workers",
    LinkTitle: "JavaScript Web Workers",
    Href: "portfolio/dashboard-demo",
    Icon: "",
    Workers: {
      Main: "./workers/db-demo-worker.js"
    },
    WorkerActions: {
      APIs: "apis",
      QuickList: "quickList"
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
      switch (event.data.action)
      {
        case _self.props.WorkerActions.APIs:
          { //  console.debug( _self.props.WorkerActions.APIs, 'message event.data', event.data );
            _self.setState( { apiMessage: event.data });
            break;
          }
        case _self.props.WorkerActions.QuickList:
          { //  console.debug('count message event.data', event.data);
            if (event.data.data === "STOPPED")
            {
              _self.setState({ cmRunning: false });
            }
            else
            {
              let _temp_messages = _self.state.countMessages;
              _temp_messages.push(event.data);
              _self.setState({ countMessages: _temp_messages });
            }
            break;
          }
        default:
          {
            _self.setState({
              apiMessage: undefined,
              countMessage: undefined,
              cmRunning: false
            });
          }
      };
      return;
    };
    return;
  };

  GetAPIData()
  { //  console.debug( "getGitHibCommits()", this.props.Workers.Git );
    this.CreateWebWorker( this.props.Workers.Main );
    this.webWorkerTask.postMessage({
      action: this.props.WorkerActions.APIs,
      sent: new Date().toISOString(),
      page: this.state.apiPagingIndex,
      count: 20
    });
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
    //  console.debug( '_new_idx', _new_idx );

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
  {   //  console.debug( "startTimer()", this.webWorkerTask );
    this.CreateWebWorker( this.props.Workers.Main );
    this.webWorkerTask.postMessage( {
      action: this.props.WorkerActions.QuickList,
      id: "TEMP ID 9999",
      total: 3,
      data: 'Testing this web worker global script scope.',
      timer_value: 250
    });
    this.setState({
      cmRunning: true,
      countMessages: []
    });
    return;
  };
  stopTimer()
  {   //  console.debug( "stopTimer()" );
    if (this.webWorkerTask !== undefined)
    {
      this.webWorkerTask.terminate();
      this.webWorkerTask = undefined;
    }
    this.setState({
      cmRunning: false
    });
    return;
  };

  componentDidMount()
  {	//	console.debug( "DashboardDemo.componentDidMount()");
    return;
  }
  componentWillUnmount()
  {	//	console.debug( "DashboardDemo.componentWillUnmount()" );
    if (this.webWorkerTask !== undefined)
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
        <div>{ this.props.Title }</div>

        { /* Worker - "git" action */ }
        <div>
          <button
            tabIndex="0"
            className="db-app-btn"
            onClick={ this.GetAPIData.bind(this) }>Fetch API Data</button>
          <button
            tabIndex="0"
            className="db-app-btn"
            onClick={ this.ClearGitHibCommits.bind( this ) }>Clear</button>
        </div>
        {
          this.state.apiMessage === undefined &&
          <div>No results at this time</div>
        }
        {
          this.state.apiMessage !== undefined &&
          <>
            <div>
              <button
                tabIndex="0"
                className="db-app-btn"
                onClick={ this.OnClick_PageResults.bind( this, -1 ) }
                disabled={ this.state.apiPagingIndex === 1}>Previous Page</button>
              <button
                tabIndex="0"
                className="db-app-btn"
                onClick={ this.OnClick_PageResults.bind( this, 1 ) }
                disabled={ this.state.apiPagingIndex === this.state.apiMessage.pageCount }>Next Page</button>
              <span>Page { this.state.apiPagingIndex } of { this.state.apiMessage.pageCount }</span>
            </div>
            <div>
              {
                this.state.apiMessage.entries.length > 0 &&
                this.state.apiMessage.entries.map((item, idx) => (
                  <div key={ idx } className="ww-count-panel">
                    <div>API: { item.API }</div>
                    <div>Auth: { item.Auth.toString() }</div>
                    <div>Category: { item.Category }</div>
                    <div>CORS: { item.Cors }</div>
                    <div>Description: { item.Description }</div>
                    <div>HTTPS: { item.HTTPS.toString() }</div>
                    <div>Link: { item.Link }</div>
                  </div>
                ))
              }
            </div>
          </>
        }

        { /* Worker - "count" action */ }
        <div>
          <button
            tabIndex="0"
            className="db-app-btn"
            onClick={ this.startTimer.bind(this) }
            disabled={ this.state.cmRunning === true }>Start Timer Data</button>
          <button
            tabIndex="0"
            className="db-app-btn"
            onClick={ this.stopTimer.bind(this) }
            disabled={ this.state.cmRunning === false }>Stop</button>
        </div>

        {
          this.state.countMessages.length > 0 &&
          this.state.countMessages.map((item, idx) => (
            <div key={ idx } className="ww-count-panel">
              <div>ACTION: { item.action }</div>
              <div>ID: { item.data.id }</div>
              <div>INDEX: { item.data.index }</div>
              <div>TOTAL: { item.data.total }</div>
              <div>DATA: { item.data.data }</div>
              <div>DATE: { item.data.date !== null && new Date(item.data.date).toISOString() }</div>
            </div>
          ))
        }
      </div>
    );
  }
};
