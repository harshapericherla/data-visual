import React, { Component } from 'react'
import * as d3 from "d3";
import PieChart from './PieChart';
import '../styles/chart.css';
import {connect} from 'react-redux';
import {YEAR_CLICKED, EMPLOYMENT_CLICKED, PROVINCE_CLICKED} from './../actions/types';
import BarChart from './BarChart';

class Chart extends Component {


    constructor()
    {
        super()
        this.state = {
            pieChartData:[],
            barChartData:[],
            pieOneProp:"Sex",
            pieTwoProp:"Age group",
            pieThreeProp:"Job tenure",
            dataAvailable: false
        }
    }

    componentWillReceiveProps(props)
    {
        let year = props[YEAR_CLICKED];
        let empType = props[EMPLOYMENT_CLICKED];
        let province = props[PROVINCE_CLICKED];
        this.initializeData(year,empType,province);
    }

    componentDidMount()
    {
        this.initializeData("2018","Full-time employment","Ontario");
    }


    initializeData = (year,empType,province) => {
            d3.csv("data.csv",(error, csvData) => {
                
                let data = csvData;
                let yearData = this.filterData("REF_DATE",year,data);   
                let provinceData = this.filterData("GEO",province,yearData);

                if(provinceData.length == 0)
                {
                    this.setState({dataAvailable:false});
                }
                else
                {
                    this.setState({dataAvailable:true});
                    let typeOfWork = this.filterData("Type of work",empType,provinceData);
                    let standardUom = this.filterData("UOM_ID","249",typeOfWork);
                    let standardScalar = this.filterData("SCALAR_ID","3",standardUom);

                    let bothWork = this.filterData("Type of work","Both full and part-time employment",provinceData);
                    let barStandardUom = this.filterData("UOM_ID","249",bothWork);
                    let barStandardScalar = this.filterData("SCALAR_ID","3",barStandardUom);

                    this.setState({pieChartData:standardScalar,barChartData:barStandardScalar});           
                }
            });
    }

    filterData = (keyArg,filterArg,dataArg) =>
    {
        let data = [];
        let nestedData = d3.nest().key(d => d[keyArg]).entries(dataArg);
        data = nestedData.filter( (data) => {
            if(data.key == filterArg)
            {
                    return true;
            }
            return false;
        })[0];
        data = data ? data.values: [];
        return data;
    }

    getPieData(data,value)
    {
        let nestedPie = d3.nest().key(d => d[value]).entries(data);
        for(let i=0;i<nestedPie.length;i++)
        {
              let obj = nestedPie[i].values;
              let sum = d3.sum(obj,(d) => parseInt(d.VALUE));
              nestedPie[i].sum = sum;
        }


        let pieChart = d3.pie();

        pieChart.value(d => d.sum);
        let myPie = pieChart(nestedPie);
        return myPie;
    }

    render() {
        return (
            <div id="chart">
                <div id="provinceLabel">{this.props[PROVINCE_CLICKED]}</div>
                <div id="pieCharts" style={{"display":this.state.dataAvailable ? "flex":"none"}}>
                    <PieChart data={this.getPieData(this.state.pieChartData,this.state.pieOneProp)} value={this.state.pieOneProp}  label="Employment: Gender"/>
                    <PieChart data={this.getPieData(this.state.pieChartData,this.state.pieTwoProp)} value={this.state.pieTwoProp}  label="Employment: Age Group"/>
                    <PieChart data={this.getPieData(this.state.pieChartData,this.state.pieThreeProp)} value={this.state.pieThreeProp}  label="Employment: Job Tenure"/>
                </div>
                <div id="barChart" style={{"display":this.state.dataAvailable ? "flex":"none"}}>
                    <BarChart data={this.state.barChartData} label="Employment: Full and Part Time Job Tenure"/>
                </div>
                <div id="no-data" style={{"display":this.state.dataAvailable ? "none":"flex"}}>
                     No Data Available
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    state.jobs = state.jobs || {}; 
    let props = {
        [YEAR_CLICKED]: state.jobs[YEAR_CLICKED] || "2018",
        [EMPLOYMENT_CLICKED]: state.jobs[EMPLOYMENT_CLICKED] || "Full-time employment",
        [PROVINCE_CLICKED]: state.jobs[PROVINCE_CLICKED] || "Ontario"
    }
    return props;
}
export default connect(mapStateToProps)(Chart);

/*
0: {key: "Canada", values: Array(729)}
1: {key: "Newfoundland and Labrador", values: Array(729)}
2: {key: "Prince Edward Island", values: Array(729)}
3: {key: "Nova Scotia", values: Array(729)}
4: {key: "New Brunswick", values: Array(729)}
5: {key: "Quebec", values: Array(729)}
6: {key: "Ontario", values: Array(729)}
7: {key: "Manitoba", values: Array(729)}
8: {key: "Saskatchewan", values: Array(729)}
9: {key: "Alberta", values: Array(729)}
10: {key: "British Columbia", values: Array(729)}
*/

/*
0: {key: "Both full and part-time employment", values: Array(243)}
1: {key: "Full-time employment", values: Array(243)}
2: {key: "Part-time employment", values: Array(243)}
*/