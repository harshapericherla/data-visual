import React from 'react';
import MapComponent from './components/MapComponent';
import Chart from './components/Chart';
import './App.css';
import { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './actions/ChartAction';

class App extends Component {

  state = {
    year: "2018",
    empType: "Full-time employment"
  }

  yearClicked = (year) => {
      this.setState({year});
      this.props.yearClicked(year);
  }

  employmentClicked = (empType) => {
      this.setState({empType});
      this.props.employmentClicked(empType);
  }
  
  render()
  {
    return (
      <div className="App"> 
          <div id="dashBoard">
               <div class="group group-one">
                   <div class="header">
                       Years
                   </div>
                   <div class="content">
                      <div class={ this.state.year === "2018" ? "cText active" : "cText"  } onClick={() => this.yearClicked("2018")}>2018</div>
                      <div class={ this.state.year === "2019" ? "cText active" : "cText"  } onClick={() => this.yearClicked("2019")}>2019</div>
                   </div>
               </div>
               <div class="group">
                  <div class="header">
                        Employment Type
                  </div>
                  <div class="content">
                      <div class="cText" class={ this.state.empType === "Full-time employment" ? "cText active" : "cText"  } onClick={() => this.employmentClicked("Full-time employment")}>Full-Time</div>
                      <div class="cText" class={ this.state.empType === "Part-time employment" ? "cText active" : "cText"  } onClick={() => this.employmentClicked("Part-time employment")}>Part-Time</div>
                  </div>
               </div>
          </div>
          <div id= "bodyCt">
            <MapComponent />
            <Chart />
          </div>
      </div>
    );
  }
}

export default connect(null,actions)(App);
