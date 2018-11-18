import React from "react";

import "./styles.css";

export default class TabPanel extends React.Component {
  render() {
    const { children } = this.props;
    return <div className="tab-panel">{children}</div>;
  }
}
