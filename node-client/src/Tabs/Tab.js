import React from "react";

import "./styles.css";

export default class Tab extends React.Component {
  render() {
    const { children, onClickTab, active } = this.props;
    return (
      <div onClick={onClickTab} className={`tab ${active ? "active" : ""}`}>
        {children}
      </div>
    );
  }
}
