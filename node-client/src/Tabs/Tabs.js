import React from "react";

import TabList from "./TabList";
import TabPanels from "./TabPanels";

import "./styles.css";

export default class Tabs extends React.Component {
  state = {
    activeIdx: 0
  };

  onChangeTab = clickedIndex => {
    this.setState({ activeIdx: clickedIndex });
  };

  render() {
    const { children } = this.props;
    const { activeIdx } = this.state;
    return (
      <div className="tabs">
        {children.map((child, index) => {
          if (child.type === TabList) {
            return React.cloneElement(child, {
              activeIdx,
              onChangeTab: this.onChangeTab,
              key: index
            });
          } else if (child.type === TabPanels) {
            return React.cloneElement(child, {
              activeIdx,
              key: index
            });
          }
          return null;
        })}
      </div>
    );
  }
}
