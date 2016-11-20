import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import List from './components/List';
import Item from './components/Item';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="AMNH API Portal"/>
        <div style={{
          width: '60em',
          margin: '2em auto'
        }}>
          {!this.props.params.id && <List {...this.props.params} />}
          {this.props.params.id && <Item {...this.props.params} />}
        </div>
      </div>
    );
  }
}

export default App;
