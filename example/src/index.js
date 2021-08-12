import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        before-run-webpack-plugin example webpack --mode production index.html
        development.js to production.min.js
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
