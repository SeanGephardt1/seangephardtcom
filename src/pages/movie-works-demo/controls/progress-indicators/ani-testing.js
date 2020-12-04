class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      progress: 0,
    };
  }
  
  update() {
    this.setState((state) => ({
      progress: (state.progress + 0.5) % 100,
    }));
  }  

  render() {
    const { color } = this.props;
    const { progress } = this.state;
    
    const style = {
      background: color,
      width: `${ progress }%`,
    };
    
    return(
      <div className="progressBarWrapper">
        <div className="progressBarProgress" style={ style }></div>
      </div>
    );  
  }
}

class Main extends React.Component
{
	constructor( props ) 
	{
		super(props);
    
		const progress1 = this.progress1 = React.createRef();
		const progress2 = this.progress2 = React.createRef();
		const progress3 = this.progress3 = React.createRef();
    
		this.componentsToUpdate = [progress1, progress2, progress3];
		this.animationID = null;    
	 }
  
	componentDidMount()
	{  
		this.animationID = window.requestAnimationFrame(() => this.update());  
	}	
  
	componentWillUnmount()
	{
		window.cancelAnimationFrame(this.animationID);
	}
  
	update() 
	{
    this.componentsToUpdate.map(component => component.current.update());
  
    this.animationID = window.requestAnimationFrame(() => this.update());  
  }
  
  render() {
    return(
      <div>
        <ProgressBar ref={ this.progress1 } color="magenta" />
        <ProgressBar ref={ this.progress2 } color="blue" />     
        <ProgressBar ref={ this.progress3 } color="yellow" />       
      </div>
    );
  }
}