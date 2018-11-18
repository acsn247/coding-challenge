import React from "react";

import "./styles.css";

export default class TabList extends React.Component {
  render() {
    const { children, activeIdx, onChangeTab } = this.props;
    return (
      <div className="tab-list">
        {children.map((child, index) => {
          return React.cloneElement(child, {
            active: activeIdx === index,
            onClickTab: () => onChangeTab(index),
            key: index
          });
        })}
      </div>
    );
  }
}
