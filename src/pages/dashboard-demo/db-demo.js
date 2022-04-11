import React from 'react';
import './db-demo.css';

export default class DashboardDemo extends React.Component
{
  static defaultProps = {
    Title: "Dashboard Demo",
    LinkTitle: "Dashboard Demo",
    Href: "portfolio/dashboard-demo",
    Icon: "",
    Workers: {
      Git: "./workers/db-demo-worker.js",
    }
  };
  constructor ( props )
  {
    super( props );
    document.title = this.props.Title;

    this.webWorkerTask = undefined;

    this.state = {
      debug: true,
      countMessage: undefined,
      gitMessage: undefined
    };
    return;
  };
  CreateWebWorker()
  {   //  
    console.debug( "CreateWebWorker", this.props.Workers.Git );

    const _self = this;

    this.webWorkerTask = new Worker( this.props.Workers.Git );
    this.webWorkerTask.onerror = function ( event )
    {
      console.error( "this.webWorkerTask.onerror", event );
      return;
    };
    this.webWorkerTask.onmessage = function ( event )
    {   //  console.debug( "this.webWorkerTask.onmessage", event );
      switch ( event.data.action )
      {
        case "git":
          {
            _self.setState( { gitMessage: event.data } );
            break;
          }
        case "count":
          {
          _self.setState( { countMessage: event.data } );
          break;
        }
        default:
          {
            _self.setState( {
              gitMessage: undefined,
              countMessage: undefined
            } );
          }
      };
      return;
    };
    return;
  };
  getGitHibCommits()
  {
    console.debug( "getGitHibCommits()", this.props.Workers.Git );
    this.CreateWebWorker();
    this.webWorkerTask.postMessage( {
      action: "git",
      sent: new Date().toUTCString()
    } );
    return;
  };
  clearGitHibCommits()
  {
    this.setState( { gitMessage: undefined } );
    return;
  };

  startTimer()
  {   //  console.debug( "startTimer()", this.webWorkerTask );
    this.CreateWebWorker();
    this.webWorkerTask.postMessage( {
      action: "count",
      id: 999,
      data: 'Testing this web worker script',
      timer_value: 1000
    } );
    return;
  };
  stopTimer()
  {   //  console.debug( "stopTimer()" );
    if ( this.webWorkerTask !== undefined )
    {
      this.webWorkerTask.terminate();
      this.webWorkerTask = undefined;
    }
    return;
  };
  componentDidMount()
  {	//	console.debug( "DashboardDemo.componentDidMount()");
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
        <div>Dashboard Demo</div>

        { /* Worker - "git" action */ }
        <div>
          <button className="btn" onClick={ this.getGitHibCommits.bind( this ) }>Get My GitHub repo commits</button>
          <button className="btn" onClick={ this.clearGitHibCommits.bind( this ) }>Clear</button>
        </div>
        {
          this.state.gitMessage !== undefined &&
          <>
            <div>ACTION: { this.state.gitMessage.action }</div>
            <div className="github-card-panel">
              {
                this.state.gitMessage.data.length > 0 &&
                this.state.gitMessage.data.map( ( item, idx ) => (
                  <div key={ idx } className="github-card">
                    <div className="github-card-left">
                      <a href={ item.author.html_url }>
                        <img
                          src={ item.author.avatar_url }
                          alt={ item.author.login }
                          title={ item.commit.message }
                        />
                      </a>
                    </div>
                    <div className="github-card-right">
                      <div>{ item.author.login }</div>
                      <div>{ item.commit.author.date }</div>
                      <div><a href={ item.html_url } title={ item.commit.message }>Commit</a></div>
                    </div>
                  </div>
                ) )
              }
            </div>
          </>
        }

        { /* Worker - "count" action */ }
        <div>
          <button className="btn" onClick={ this.startTimer.bind( this ) }>Start Timer Data</button>
          <button className="btn" onClick={ this.stopTimer.bind( this ) }>Stop</button>
        </div>

        {
          this.state.countMessage !== undefined &&
          <>
            <div>ACTION: { this.state.countMessage.action }</div>
            <div>ID: { this.state.countMessage.data.id }</div>
            <div>INDEX: { this.state.countMessage.data.index }</div>
            <div>DATE: {
              this.state.countMessage.data.date !== null &&
              new Date( this.state.countMessage.data.date ).toUTCString()
            }</div>
            <div>DATA: { this.state.countMessage.data.data }</div>
          </>
        }
      </div>
    );
  }
};
