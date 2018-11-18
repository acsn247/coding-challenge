import React, { Component } from "react";
import "./App.css";
// import { data } from "./mock-data";
// import openSocket from "socket.io-client";
import Chart from "./Chart/Chart";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";
import TabPanels from "./Tabs/TabPanels";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const limit = 10;
    const offset = 12;
    setInterval(() => {
      fetch(
        `http://localhost:4000/transactions?limit=${limit}&offset=${offset}`
      )
        .then(json => json.json())
        .then(res => {
          console.log("data", res);
          if (res) {
            this.setState({
              data: res
            });
          }
        })
        .catch(error => {
          console.log("error: ", error);
        });
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Tab1 </Tab>
            <Tab>Tab2 </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Chart data={this.state.data} />
            </TabPanel>
            <TabPanel>Tab Content 2</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default App;
