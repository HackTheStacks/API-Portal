import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class Expeditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expedition: {}
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    fetch(`http://10.20.40.218:3000/api/v1/expeditions/${this.props.id}`)
      .then(response => response.json())
      .then(expedition => this.setState({ expedition }));
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={`GET - /api/v1/expeditions/${this.props.id}`} />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton
              label="Refresh"
              primary={true}
              onClick={() => this.fetch()}
            />
          </ToolbarGroup>
        </Toolbar>
        <pre dangerouslySetInnerHTML={{__html: this.state.expedition}}></pre>
      </div>
    );
  }
}
