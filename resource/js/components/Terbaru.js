import React from 'react';
import axios from 'axios';
export default class Terbaru extends React.Component {
  constructor(){
    super();
    this.state = {
      terbaru : null
    }
  }
  componentDidMount(){
    var _this = this;
    this.serverRequest = axios.get(
      'http://api.viva.co.id/v/901/terbarulist'
    ).then((result) => {
      _this.setState({
        terbaru : result.data.response[0]['terbaru']
      });
    })
  }
  render() {
    console.log(this.state.terbaru);
    if(this.state.terbaru !== null){
      var vivadata = this.state.terbaru;
      return (
        <div>
        <h3>Berita Terbaru : </h3>
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
