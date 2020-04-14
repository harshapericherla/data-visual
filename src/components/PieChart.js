import React, { Component } from 'react'
import * as d3 from "d3";
import './../styles/pieChart.css';

class PieChart extends Component {


    state = {
        svgWidth:300,
        svgHeight: 300
    }
    componentWillReceiveProps(props)
    {
         if(props.data.length > 0)
         {
              let myPie = props.data;
              let value = props.value;
              let newArc = d3.arc();
              newArc.innerRadius(80)
                    .outerRadius(100);
              d3.select(`#`+value.split(" ")[0]).selectAll("*").remove();
              let colourScale = d3.scaleOrdinal().range([`#f7362d`,'#3eb489','#ff665e','#bfe5c9','#00aa93']);
              
              var div = d3.select(`body`).append("div")	
                        .attr("class", "tooltip")				
                        .style("opacity", 0)
                        .style("display","none")
            
             var g =   d3.select(`#`+value.split(" ")[0])
                .append("g")
                .attr("transform","translate(150,150)")


                g.selectAll("path")
                .data(myPie)
                .enter()
                .append("path")
                .attr("class","arc")
                .on("mouseover", function({data}) {	
                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9)
                        .style("display","flex");	
                    div.html(`<span class="item"><span class="label">Type</span> : ${data.key}</span> <span class="item"> <span class="label">Population</span>: ${data.sum * 1000}</span>`)	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px");	
                    })
                .on("mouseout", function(d) {		
                        div.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                 })	
                .style("fill",(d,i) => colourScale(i))
                .transition().delay(function(d,i) {
                    return i * 500; }).duration(1000)
                    .attrTween('d', function(d) {
                        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                        return function(t) {
                            d.endAngle = i(t);
                          return newArc(d);
                        }
                     });
         }

    }

    render() {
        return (
            <div>
                <div id={`pie${this.props.value}`} class="pieChart">
                    <svg id={this.props.value.split(" ")[0]} width={this.state.svgWidth} height={this.state.svgHeight} ></svg>
                </div>
                <div class="pieLabel">
                    {this.props.label}
                </div>
            </div>
        )
    }
}

export default PieChart;