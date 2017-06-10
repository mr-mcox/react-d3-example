import React, { Component } from 'react'
import { histogram } from 'd3-array'
import { min } from 'd3-array'
import { max } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import HistogramBar from './HistogramBar'
import Axis from './Axis'

class Histogram extends Component {
  constructor(props){
    super()

    this.histogram = histogram()
    this.widthScale = scaleLinear()
    this.yScale = scaleLinear()
    this.update_d3(props)
  }

  componentWillReceiveProps(newProps) {
    this.update_d3(newProps)
  }

  update_d3(props){

    this.histogram
      .thresholds(props.bins)
      .value(props.value)
    let bars = this.histogram(props.data),
      counts = bars.map((d) => d.length)

    this.widthScale
      .domain([min(counts), max(counts)])
      .range([9, props.width-props.axisMargin])
    this.yScale
      .domain([0, max(bars.map((d) => d.x1))])
      .range([0, props.height-props.topMargin-props.bottomMargin])
  }

  makeBar(bar) {
    let percent = bar.length / this.props.data.length * 100
    let props = { percent,
                  x: this.props.axisMargin,
                  y: this.yScale(bar.x0),
                  width: this.widthScale(bar.length),
                  height: this.yScale(bar.x1 - bar.x0),
                  key: 'histogram-bar' + bar.x0 + '-' + bar.x1}
    return ( <HistogramBar {...props} /> )
  }

  render() {
    let translate = `translate(0, ${this.props.topMargin})`,
      bars = this.histogram(this.props.data)

    return (
      <g className="histogram" transform={translate}>
        <g className="bars">
          {bars.map(this.makeBar.bind(this))}
        </g>
        <Axis {...this.props} data={bars} />
      </g>
    )
  }
}

export default Histogram
