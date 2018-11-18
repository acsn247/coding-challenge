import React, { Component } from "react";
import "./App.css";
// import { data } from "./mock-data";
import openSocket from "socket.io-client";
import Chart from "./Chart/Chart";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const socket = openSocket("http://localhost:4000");
    socket.on("change_data", res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <div className="App">
        <Chart data={this.state.data} />
      </div>
    );
  }
}

export default App;
