let i = 0;
let _timer = undefined;

class CountMessage
{
  constructor ( id, idx, d, data, tot )
  {
    this.id = id || -1;
    this.index = idx || 0;
    this.date = d || null;
    this.data = data || "NO DATA";
    this.total = tot;
  }
};

function Count( data )
{ //  console.debug( "worker.js::Count(data)", i, data );
  if ( i < data.total )
  {
    let _m = new CountMessage(
      Math.round( Math.random() * 10000 ),
      i + 1,
      new Date().toISOString(),
      "Message # " + ( i + 1) + " : " + data.id + " : " + data.data,
      data.total);

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

  i++;
  return;
};

//  https://github.com/SeanGephardt1/seangephardtcom/graphs/commit-activity
//  https://api.github.com/repos/SeanGephardt1/seangephardtcom/commits
//  https://github.com/javascript-tutorial/en.javascript.info
//  https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits
//  let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
//  https://api.publicapis.org/entries
async function GetFetchData()
{ //  console.debug( 'worker.js::GetFetchData()' );
  //const url = 'https://api.github.com/repos/SeanGephardt1/seangephardtcom/commits';

  const url = "https://api.publicapis.org/entries";

  let response = await fetch( url );

  // read response body and parse as JSON
  let commits = await response.json();
  //  console.debug( commits );

  let message = {
    action: "git",
    length: commits.length,
    data: commits
  }

  postMessage( message );
  return;
};

this.onmessage = function ( e )
{
  console.debug( 'Worker message:', e.data );
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