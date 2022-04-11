let i = 0;
let _timer = undefined;

class CountMessage
{
  constructor ( id, idx, d, data )
  {
    this.id = id || -1;
    this.index = idx || 1;
    this.date = d || null;
    this.data = data || "NO DATA";
  }
};

function Count( data )
{
  console.debug( "worker.js::Count(data)", i, data );
  i++;

  if ( i < 10 )
  {
    let _m = new CountMessage(
      Math.round( Math.random() * 10000 ),
      i,
      new Date().toISOString(),
      "Message #" + i + " : " + data.id + " : " + data.data );

    //  console.debug( "_m", _m );
    const message = {
      action: data.action,
      data: _m
    };
    postMessage( message );
  }
  else
  {
    clearInterval( _timer );
    _timer = undefined;
  }
  return;
};

//  https://github.com/SeanGephardt1/seangephardtcom/graphs/commit-activity
//  https://api.github.com/repos/SeanGephardt1/seangephardtcom/commits
//  https://github.com/javascript-tutorial/en.javascript.info
//  https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits
//  let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
async function GetFetchData()
{
  console.debug( 'worker.js::GetFetchData()' );

  let url = 'https://api.github.com/repos/SeanGephardt1/seangephardtcom/commits';
  let response = await fetch( url );

  // read response body and parse as JSON
  let commits = await response.json();
  //  console.debug( commits );

  let message = {
    action: "git",
    data: commits //.slice( commits.length - 3 )
  }

  postMessage( message );
  return;
};

this.onmessage = function ( e )
{
  console.debug( 'Worker: Handle messages received:', e.data );
  switch ( e.data.action )
  {
    case "git": {
      this.GetFetchData();
      break;
    }
    case "count": {
      i = 0;
      clearInterval( _timer );
      _timer = undefined;
      _timer = this.setInterval( () => { Count( e.data ) }, e.data.timer_value );
      break;
    }
  };
  return;
};