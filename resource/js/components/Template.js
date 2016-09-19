import React from 'react';
import {Link} from 'react-router';
export default class Template extends React.Component {
  render() {
    return(
      <div>
        <h1>Swenews</h1>
        <div>
          <div className="row">
            <div className="col-xs-6">
              <Link to="/">Home</Link>
            </div>
            <div className="col-xs-6">
              <Link to="terbaru">Terbaru</Link>
            </div>
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
