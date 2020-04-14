import React, { Component } from 'react'
import * as d3 from "d3";
import "../styles/map.css";
import {connect} from 'react-redux';
import * as actions from './../actions/ChartAction';

class MapComponent extends Component {


    state = {
        svgWidth: 900,
        svgHeight: 500
    }

    componentDidMount()
    {
         this.renderMap();
    }

    renderMap()
    {
        let x = this.state.svgWidth/2;
        let y = this.state.svgHeight/2;
        var chosenProjection = d3.geoMercator()
                                .center([-96.0, 56.0])
                                .scale(400)
                                .translate([x,y]);
                             
        var path = d3.geoPath()
        .projection(chosenProjection);
        let mapThis = this;
        d3.json("canadamap.json", function(error, geoData) {
          
          let boundary = d3.select("svg").append("g")
                .attr("class","boundary")
                .selectAll("boundary")
                .data(geoData.features)
                .enter().append("g")
                .attr("class",d => {
                     if(d.properties.name === 'Ontario')
                     {
                         return "province pClicked";
                     }
                     return "province";
                })
            
          let paths = boundary.append("path")
                    .attr("class",d => {
                        if(d.properties.name === 'Ontario')
                        {
                            return "regionClick";
                        }
                        return "region";
                    })
                    .attr("d",path)
                    .on("click", function(d){
                         d3.selectAll(".regionClick").attr("class", "region");
                         d3.selectAll(".province").attr("class", "province");
                         d3.select(this).attr("class","regionClick")
                         d3.select(this.parentNode).attr("class","province pClicked");
                         let proviceName = d.properties.name;
                         mapThis.props.provinceClicked(proviceName);
                     })
          let tooltip = boundary.append("svg:title")
                       .append("text")
                       .text(d => d.properties.name)
          let names = boundary.append("text")
                              .attr("class","pText")
                              .each( (d) => {
                                  let centroid = path.centroid(d);
                                  d.textX = centroid[0];
                                  d.textY = centroid[1];
                              })
                              .attr("x",(d) => d.textX - 10)
                              .attr("y",(d) => d.textY)
                              .text(d => d.properties.name)
        });
    }
    render() {
        return (
            <div id="map">
                 <svg width={this.state.svgWidth} height={this.state.svgHeight}></svg>
            </div>
        )
    }
}
export default connect(null,actions)(MapComponent);
