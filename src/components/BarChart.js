import React, { Component } from 'react';
import * as d3 from "d3";
import './../styles/bar.css';

export default class BarChart extends Component {

    state = {
        svgWidth:700,
        svgHeight: 300
    }

    componentWillReceiveProps(props)
    {
         if(props.data.length > 0)
         {
             let data = props.data;
             let jobTenureData = d3.nest().key(d => d["Job tenure"]).entries(data);
             
             jobTenureData = jobTenureData.filter( (d) => {
                 if(d.key === "Total employed")
                 {
                     return false;
                 }
                 return true;
             });
             for(let i=0;i<jobTenureData.length;i++)
             {
                   let obj = jobTenureData[i].values;
                   let sum = d3.sum(obj,(d) => parseInt(d.VALUE));
                   jobTenureData[i].sum = sum * 1000;
             }
             d3.select(`#barSvg`).selectAll("*").remove();
             
             var div = d3.select(`body`).append("div")	
             .attr("class", "tooltip")				
             .style("opacity", 0)
             .style("display","none")
             let highestRange = 200; 
             let higestDomain = d3.max(jobTenureData, d => d.sum);
             let yScale = d3.scaleLinear().domain([0,higestDomain]).range([0,highestRange]);
             
             let svg = d3.select("#barSvg")
             .attr("transform","translate(0,150)")
             .selectAll("rect")
             .data(jobTenureData)
             .enter()
             .append("g")

             svg.append("rect").attr("width",80)
             .attr("height", d => yScale(d.sum))
             .on("mouseover", function(data) {	
                console.log(data);
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9)
                    .style("display","flex");	
                div.html(`<span class="item"><span class="label">Population</span>:${data.sum}</span>`)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })
            .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
             })	
             .transition()
                .duration(750)
                .delay(function (d, i) {
                    return i * 150;
                })
             .attr("x", (d,i) => i*100)
             .attr("y",d => highestRange - yScale(d.sum))
             .style("fill", "#3eb489")
             .style("stroke", "#9A8B7A")
             .style("stroke-width", "1px")
             

             svg.append("text").attr("class","txt-class").attr("x", (d,i) => i*100)
             .attr("y",d => highestRange+20)
             .text(d => {  console.log(d);  return d.key})
         }
    }
    render() {
        return (
            <div id="barGraph">
                <div id="barChartGraph">
                    <svg id="barSvg" width={this.state.svgWidth} height={this.state.svgHeight} ></svg>
                </div>
                <div class="barLabel">
                        {this.props.label}
                </div>
            </div>
        )
    }
}
