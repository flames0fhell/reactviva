import React from 'react';
import {Card,
        CardActions,
        CardHeader,
        CardMedia,
        CardTitle,
        CardText} from 'material-ui/Card';
import LazyLoad from 'react-lazy-load';
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import axios from 'axios';

export default class Content extends React.Component{
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
  actionTap(x){

  }
  cardLoad(object,i){
    return (
      <div>
        <Card style={{marginBottom : '10px'}}>
          <LazyLoad>
            <CardMedia>
              <img src={object.image_url} />
            </CardMedia>
          </LazyLoad>
          <CardTitle>{object.title}</CardTitle>
        </Card>
      </div>

    );
  }
  render(){
    if(this.state.terbaru === null){
      return (
        <div>
          <RefreshIndicator size={40}
                            left={-20}
                            top={100}
                            status={'loading'}
                            style={{marginLeft: '50%'}}
          />

        </div>

      );
    }
    var _this = this;
    const {terbaru} = this.state;
    return(
      <div style={{paddingTop : '70px'}}>
        {
          terbaru.map(function(object,i){
          return (
            <div key = {i}>
              {_this.cardLoad(object,i)}
            </div>
          )
        })}
      </div>
    );
  }
}
