import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import List from './components/List';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="AMNH API Portal"/>
        <div style={{
          width: '60em',
          margin: '2em auto'
        }}>
          <List entities={this.props.params.entities} />
        </div>
      </div>
    );
  }
}

export default App;
