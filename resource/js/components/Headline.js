import React from 'react';
import axios from 'axios';
export default class Headline extends React.Component {
  constructor(){
    super();
    this.state = {
      headline : null
    }
  }
  componentDidMount(){
    var _this = this;
    this.serverRequest = axios.get(
      'http://api.viva.co.id/v/901/headlinelist'
    ).then((result) => {
      console.log(result);
      _this.setState({
        headline : result.data.response[0]['headlines']
      });
    })
  }
  render() {
    console.log(this.state.headline);
    if(this.state.headline !== null){
      var vivadata = this.state.headline;
      // console.log("VData");
      // console.log(vivadata);
      return (
        <div>
          <h3 className="text-danger">Headline</h3>
        {vivadata.map(function(viva){
          return (
            <div key={viva.id}>
              {viva.title}
            </div>
          )
        })}
        </div>
      )
    }else{
      return (<div>Loading ... </div>);
    }
  }
}
