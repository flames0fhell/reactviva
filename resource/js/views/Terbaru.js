import React from 'react';
import Moment from 'moment';
import {Card,
        CardActions,
        CardHeader,
        CardMedia,
        CardTitle,
        CardText} from 'material-ui/Card';
import LazyLoad from 'react-lazy-load';
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import axios from 'axios';

export default class Content extends React.Component{
  constructor(){
    Moment.locale("id");
    super();
    this.state = {
      terbaru : null
      ,last_publish_date : null
      ,allowLoad : true
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
    }).then(() => {
      var contentLength = _this.state.terbaru.length;
      var lpd = _this.state.terbaru[contentLength - 1]['date_publish'];
      _this.setState({
        last_publish_date : lpd
      });
    });
    var k = 0;
    window.onscroll = function(){
      var topOffset = document.documentElement.scrollTop || document.body.scrollTop;
      var wHeight = window.innerHeight;

      var body = document.body,
          html = document.documentElement;

      var areaHeight = Math.max( body.scrollHeight, body.offsetHeight,
                             html.clientHeight, html.scrollHeight, html.offsetHeight );
      var bottomClient = topOffset + wHeight;
      var load_more_offset = areaHeight - 100;
      var allowLoad = _this.state.allowLoad;
      if(load_more_offset <= bottomClient && allowLoad){
        _this.lanjut();
        console.log("OK NIH");
        _this.setState({
          allowLoad : false
        })
        allowLoad = false;
      }
    }
  }
  componentWillUnmount(){
    window.onscroll = function(){

    }
  }
  lanjut(){
    var _this = this;
    var pageStart = this.state.terbaru.length;
    var published = this.state.last_publish_date;
    published = Moment(published).format("X");
    this.serverRequest = axios.get(
      'http://api.viva.co.id/v/901/terbarulist/published/' + published
    ).then((result) => {
      console.log("Lanjut");
      var newResult = result.data.response[0]['terbaru'];
      _this.setState({
        terbaru : this.state.terbaru.concat(newResult)
      });
      //_this.forceUpdate();
    }).then(() => {
      var contentLength = _this.state.terbaru.length;
      var lpd = _this.state.terbaru[contentLength - 1]['date_publish'];
      _this.setState({
        last_publish_date : lpd
      });
    }).then(()=>{
      _this.setState({
        allowLoad : true
      });
    });
  }
  actionTap(obj){
    console.log(this.props);
    this.props.history.push('/read/' + obj.id);
  }
  cardLoad(object,i){
    var tc = Moment(object.date_publish);
    var tn = Moment();
    var selisih = tn.diff(tc,'hours');
    if(selisih <= 1){
      var tanggal = Moment(object.date_publish)
                    .fromNow();
    }else{
      var tanggal = tc.format("ddd, DD MMM YYYY - HH:mm");
    }
    return (
      <div onClick={this.actionTap.bind(this,object)}>
        <Card style={{marginBottom : '10px'}}>
          <LazyLoad offset={1000}>
            <CardMedia>
              <img src={object.image_url} />
            </CardMedia>
          </LazyLoad>
          <CardTitle subtitle={tanggal} title={object.title}></CardTitle>
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
    const terbaru = this.state.terbaru;
    const last_publish_date = this.state.last_publish_date;
    return(
      <div style={{paddingTop : '70px'}}>
        <div className="container">
          <h4>Berita Terbaru</h4>
        </div>
        {
          terbaru.map(function(object,i){
          return (
            <div key = {i}>
              {_this.cardLoad(object,i)}
            </div>
          )
        })}
        <div style={{margin : 'auto',width:'60px'}}>

          <CircularProgress />
        </div>
        <RaisedButton label="Selanjutnya ..." fullWidth={true} />
      </div>
    );
  }
}
