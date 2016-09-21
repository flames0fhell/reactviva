import React from 'react';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Card,
        CardActions,
        CardHeader,
        CardMedia,
        CardTitle,
        CardText} from 'material-ui/Card';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';


export default class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      detail : null,
      content_id : 0
    }
  }
  componentDidMount(){
    var _this = this;
    var content_id = this.props.params.id;
    this.setState({
      content_id : content_id
    });
    this.serverRequest = axios.get(
      'http://api.viva.co.id/v/901/detail/id/' + content_id
    ).then((reply) => {
      console.log(reply.data.response.detail);
      if(reply.data.response.detail !== undefined){
        _this.setState({
          detail : reply.data.response.detail
        });
      }
    });

  }
  render(){
    if(this.state.detail === null){
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
    const {detail} = this.state;
    const meta = {
      title: document.title + " - " + detail.title,
      description: detail.summary,
      canonical: detail.url,
      // meta: {
      //   charset: 'utf-8',
      //   name: {
      //     keywords: 'react,meta,document,html,tags'
      //   }
      // }
    };
    return(
      <div style={{paddingTop : '70px'}}>
        <DocumentMeta {...meta} />

        <Paper zDepth={0} rounded={false}>
          <Card>
          <CardMedia
            overlay={<CardTitle
                      subtitle={"Gambar : " + detail.image_caption
                                + " (" +detail.image_src + ")"} />}
          >
              <img src={detail.image_url} />
            </CardMedia>
            <CardTitle title={detail.title} />
            <CardText style={{paddingBottom : '0', paddingTop : '0'}}>
              <div className="text-danger">Oleh : {detail.reporter_name}</div>
              <div className="text-muted">
                {detail.date_publish}
              </div>
            </CardText>

            <CardText style={{fontSize : '14pt'}}>
              <div
                dangerouslySetInnerHTML={{__html: detail.content[0]}} />
            </CardText>
          </Card>
        </Paper>
      </div>
    )
  }
}
