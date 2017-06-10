import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { axisLeft } from 'd3-axis'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class Axis extends Component {
  constructor(props) {
    super()

    this.yScale = scaleLinear()
    this.axis = axisLeft(this.yScale)
                      .tickFormat((d) => '$' + this.yScale.tickFormat()(d))
    this.update_d3(props)
  }

  componentWillReceiveProps(newProps){
    this.udpate_d3(newProps)
  }

  componentDidUpdate() { this.renderAxis() }
  componentDidMount() { this.renderAxis() }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this)

    select(node).call(this.axis)
  }

  update_d3(props){
    this.yScale
        .domain([0,
                max(props.data.map((d) => d.length))])
        .range([0, props.height - props.topMargin - props.bottomMargin])

    console.log(props.data.map((d) => d.length))
    this.axis
        .ticks(props.data.length)
  }

  render() {
    console.log(this.props)
    let translate = `translate(${this.props.axisMargin-3}, 0)`
    return (
      <g className="axis" transform={translate}>
      </g>
    )
  }
}

export default Axis
