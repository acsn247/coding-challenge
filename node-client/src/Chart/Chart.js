import React from "react";

import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";
import * as dagre from "dagre";

// Create the renderer
const render = new dagreD3.render();
// // Create a new directed graph
let g = new dagre.graphlib.Graph();

export default class Chart extends React.PureComponent {
  componentDidMount() {
    const { data } = this.props;
    if (!data) {
      return;
    }

    this.resetGraph();

    this.renderDirectedChart(g, data);

    dagre.layout(g);

    // Set up an SVG group so that we can translate the final graph.
    let svg = d3.select(this.nodeTree);

    // Run the renderer. This is what draws the final graph.
    render(d3.select(this.nodeTreeGroup), g);

    svg.attr("height", 700);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      const data = nextProps.data;

      g = new dagre.graphlib.Graph();
      this.resetGraph();

      this.renderDirectedChart(g, data);

      render(d3.select(this.nodeTreeGroup), g);
    }
  }

  resetGraph = () => {
    // Set an object for the graph label
    g.setGraph({
      width: 800,
      height: 800,
      rankdir: "LR",
      nodesep: 100,
      ranksep: 100
    });

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function() {
      return { width: 100 };
    });
  };

  renderDirectedChart = (g, data) => {
    for (let i = 0; i <= data.length; i++) {
      if (data[i] && data[i].length > 0) {
        g.setNode(i, {
          label: i,
          style: "fill: #afa"
        });
        for (let j = 0; j <= data[i].length; j++) {
          if (data[i][j]) {
            g.setEdge(data[i][j], i, {
              style:
                "fill: none; stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;",
              arrowheadStyle: "fill: #f66"
            });
          }
        }
      }
    }
  };
  render() {
    return (
      <svg
        id="nodeTree"
        ref={ref => {
          this.nodeTree = ref;
        }}
        width="800"
        height="800"
      >
        <g
          ref={r => {
            this.nodeTreeGroup = r;
          }}
        />
      </svg>
    );
  }
}
