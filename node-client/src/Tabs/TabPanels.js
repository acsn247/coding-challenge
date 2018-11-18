import React from "react";

import "./styles.css";

export default class TabPanels extends React.Component {
  render() {
    const { children, activeIdx } = this.props;
    return <div className="tab-panels">{children[activeIdx]}</div>;
  }
}
