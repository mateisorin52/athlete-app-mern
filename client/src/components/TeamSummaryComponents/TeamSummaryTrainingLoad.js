import React, { useState } from "react";
import moment from "moment";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./TeamSummaryCss/TeamSummaryTrainingLoad.css";
import arrow from "../../assets/arrow left-right.svg"
const TeamSummaryTrainingLoad = (props) => {
  var players = [];
  props.players.map((value)=>{
    if(!value.is_coach) players.push(value)
  })
  var startOfWeek = moment().startOf("week").toDate();
  const [currentShownWeek, setCurrentShownWeek] = useState(startOfWeek);
  const showDate = (date, numberDays) => {
    return moment(date).add(numberDays, "day").toDate().getDate();
  };
  const showMonth = (date, numberDays) => {
    return moment(date).add(numberDays, "day").toDate().getMonth();
  };
  const previousWeek = () => {
    setCurrentShownWeek(moment(currentShownWeek).subtract(7, "day").toDate());
  };
  const nextWeek = () => {
    if (isDateBeforeToday(moment(currentShownWeek).add(7, "day").toDate()))
      setCurrentShownWeek(moment(currentShownWeek).add(7, "day").toDate());
  };
  function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }
  const determineSession1=(days)=>{
    var forReturn=""
    const theDay = moment(currentShownWeek).add(days,"day").format("DD/MM/YY")
    players.map((value)=>{
      value.training.map((value2)=>{
        if(value2.date==theDay) forReturn = value2.session1
      })
    })
    return(forReturn)
  }
  const determineRPE1=(days)=>{
    var forReturn=0
    var forNumber=0
    const theDay = moment(currentShownWeek).add(days,"day").format("DD/MM/YY")
    players.map((value)=>{
      value.training.map((value2)=>{
        if(value2.date==theDay) {forReturn += parseInt(value2.rpe1);forNumber++}
      })
    })
    return((Math.ceil(forReturn/forNumber*10)/10)||"-")
  }
  const determineDuration1=(days)=>{
    var forReturn=""
    const theDay = moment(currentShownWeek).add(days,"day").format("DD/MM/YY")
    players.map((value)=>{
      value.training.map((value2)=>{
        if(value2.date==theDay) forReturn = value2.duration1
      })
    })
    return(forReturn)
  }
  const defaultThickness = "1.3px solid black"
  const contourBottom = {
    borderBottom:defaultThickness
  }
  const contourBottomLeft = {
    borderBottom:defaultThickness,
    borderLeft:defaultThickness
  }
  const contourLeft={
    borderLeft:defaultThickness
  }
  const contourLeftTop = {
    borderLeft:defaultThickness,
    borderTop:defaultThickness
  }
  const contourTop = {
    borderTop:defaultThickness,
    textTransform:"capitalize"
  }
  const contourTopRight = {
    borderRight:defaultThickness,
    borderTop:defaultThickness
  }
  const contourBottomRight = {
    borderBottom:defaultThickness,
    borderRight:defaultThickness
  }
  const contourRight = {
    borderRight:defaultThickness,
    textTransform:"capitalize"
  }
  const determineSession2=(days)=>{
    var forReturn=""
    const theDay = moment(currentShownWeek).add(days,"day").format("DD/MM/YY")
    players.map((value)=>{
      value.training.map((value2)=>{
        if(value2.date==theDay) forReturn = value2.session2
      })
    })
    return(forReturn)
  }
  const determineRPE2=(days)=>{
    var forReturn=0
    var forNumber=0
    const theDay = moment(currentShownWeek).add(days,"day").format("DD/MM/YY")
    players.map((value)=>{
      value.training.map((value2)=>{
        if(value2.date==theDay) {forReturn += parseInt(value2.rpe2);forNumber++}
      })
    })
    console.log(forReturn)
    return(Math.ceil(forReturn/forNumber*10)/10||"-")
  }
  const determineDuration2=(days)=>{
    var forReturn=""
    const theDay = moment(currentShownWeek).add(days,"day").format("DD/MM/YY")
    players.map((value)=>{
      value.training.map((value2)=>{
        if(value2.date==theDay) forReturn = value2.duration2
      })
    })
    
    return(parseInt(forReturn)||"")
  }
  const determineLoad=(days)=>{
    let forReturn=0
    let dur1 = determineDuration1(days)
    let dur2 = determineDuration2(days)
    let rpe1 = determineRPE1(days)
    let rpe2 = determineRPE2(days)

    if(typeof(rpe1)!="number") rpe1 = 0
    if(typeof(rpe2)!="number") rpe2= 0
    if(typeof(dur1)!="number") dur1 = 0
    if(typeof(dur2)!="number") dur2 = 0
    forReturn = Math.ceil((rpe1*dur1 + rpe2*dur2)/10)*10||"-"
    return(forReturn)
  }
  const verToday = (days)=>{
    if((showDate(currentShownWeek,days)+".0"+(showMonth(currentShownWeek, days) + 1))==(showDate(moment().toDate(),0)+".0"+(showMonth(moment().toDate(), 0) + 1))) return 1
  }
  const findWtoW = () =>{
    const daysForWtoW = [];
    var loadForLastWeek = 0;
    const lastWeek = currentShownWeek;
    var lastWeekStart = moment(lastWeek).subtract(7,"day");
    for (var i=0;i<7;i++){
      lastWeekStart = moment(lastWeek).subtract(7,"day");
      daysForWtoW.push(lastWeekStart.add(i,"d").format("DD/MM/YY"))
    }
    daysForWtoW.map((day=>{
      players.map(player=>{if(player) player.training.map((value)=>{
        if(day===value.date) loadForLastWeek+=parseInt(value.rpe1)*parseInt(value.duration1)+parseInt(value.rpe2)*parseInt(value.duration2)
      })})
     
    }))
    const currentWeek = currentShownWeek;
    var currentWeekStart = moment(currentWeek)
    var loadForCurrenWeek  = 0
    const daysForCurrentWeekLoad = []
    for(var i = 0 ; i<7; i++){
      currentWeekStart = moment(currentWeek)
      daysForCurrentWeekLoad.push(currentWeekStart.add(i,"d").format("DD/MM/YY"))
    }
    daysForCurrentWeekLoad.map((day=>{
      players.map(player=>{ if(player) player.training.map((value)=>{
        if(day===value.date) loadForCurrenWeek+=parseInt(value.rpe1)*parseInt(value.duration1)+parseInt(value.rpe2)*parseInt(value.duration2)
      })})
    
    }))
    return(Math.round((loadForCurrenWeek-loadForLastWeek)/((loadForCurrenWeek+loadForLastWeek)/2)*100)+"%")
  }
  const findLoadForCurrentWeek = ()=>{
      
    const currentWeek = currentShownWeek;
    var currentWeekStart = moment(currentWeek)
    var loadForCurrenWeek  = 0
    const daysForCurrentWeekLoad = []
    for(var i = 0 ; i<7; i++){
      currentWeekStart = moment(currentWeek)
      daysForCurrentWeekLoad.push(currentWeekStart.add(i,"d").format("DD/MM/YY"))
    }
    
    daysForCurrentWeekLoad.map((day=>{
      players.map(player=>{if(player) player.training.map((value)=>{
        if(day===value.date) loadForCurrenWeek+=parseInt(value.rpe1)*parseInt(value.duration1)+parseInt(value.rpe2)*parseInt(value.duration2)
      })})
     
    }))
    return(loadForCurrenWeek)
  }
  return (
    <div className="overview">
      <div className="prev-next-buttons">
          {moment(currentShownWeek).startOf("week").format("DD/MM/YYYY")} - {moment(currentShownWeek).startOf("week").add(6,"d").format("DD/MM/YYYY")}
          <button onClick={previousWeek} className="prev-next">
            <img className="left-arrow" src={arrow}></img>
          </button>
          <button onClick={nextWeek} className="prev-next">
          <img className="right-arrow" src={arrow}></img>
          </button>
        </div>
      <table  className="overview-table">
        <thead>
          <tr>
            <th className="table-header-cell athlete">Name</th>
            <th  className="table-header-cell">
              {verToday(0)?"Today ":`${showDate(currentShownWeek, 0)}.0${
                showMonth(currentShownWeek, 0) + 1
              }`}
              <br></br>Sunday</th>
            <th  className="table-header-cell">
              {verToday(1)?"Today ":`${showDate(currentShownWeek, 1)}.0${
                showMonth(currentShownWeek, 1) + 1
              }`}
              <br></br>Monday</th>
            <th  className="table-header-cell">
              {verToday(2)?"Today ":`${showDate(currentShownWeek, 2)}.0${
                showMonth(currentShownWeek, 2) + 1
              }`}
              <br></br>Tuesday</th>
            <th  className="table-header-cell">
              {verToday(3)?"Today ":`${showDate(currentShownWeek, 3)}.0${
                showMonth(currentShownWeek, 3) + 1
              }`}
              <br></br>Wednesday</th>
            <th  className="table-header-cell">
              {verToday(4)?"Today ":`${showDate(currentShownWeek, 4)}.0${
                showMonth(currentShownWeek, 4) + 1
              }`}
              <br></br>Thursday</th>
            <th  className="table-header-cell">
              {verToday(5)?"Today ":`${showDate(currentShownWeek, 5)}.0${
                showMonth(currentShownWeek, 5) + 1
              }`}
              <br></br>Friday</th>
            <th  className="table-header-cell">
            {verToday(6)?"Today ":`${showDate(currentShownWeek, 6)}.0${
                showMonth(currentShownWeek, 6) + 1
              }`}
              <br></br>Saturday
            </th>
            
          </tr>
        </thead>
        <tbody className="tbody-load">
            <tr>
                <td style={contourLeftTop} className="table-left-atr"> Session1</td>
                <td style={contourTop}>{determineSession1(0)}</td>
                <td style={contourTop}>{determineSession1(1)}</td>
                <td style={contourTop}>{determineSession1(2)}</td>
                <td style={contourTop}>{determineSession1(3)}</td>
                <td style={contourTop}>{determineSession1(4)}</td>
                <td style={contourTop}>{determineSession1(5)}</td>
                <td style={contourTopRight}>{determineSession1(6)}</td>
            </tr>
            <tr>
                <td style={contourLeft} className="table-left-atr">RPE</td>
                <td>{determineRPE1(0)}</td>
                <td>{determineRPE1(1)}</td>
                <td>{determineRPE1(2)}</td>
                <td>{determineRPE1(3)}</td>
                <td>{determineRPE1(4)}</td>
                <td>{determineRPE1(5)}</td>
                <td style={contourRight}>{determineRPE1(6)}</td>
            </tr>
            <tr>
                <td style={contourBottomLeft} className="table-left-atr">Duration</td>
                <td style={contourBottom}>{determineDuration1(0)}</td>
                <td style={contourBottom}>{determineDuration1(1)}</td>
                <td style={contourBottom}>{determineDuration1(2)}</td>
                <td style={contourBottom}>{determineDuration1(3)}</td>
                <td style={contourBottom}>{determineDuration1(4)}</td>
                <td style={contourBottom}>{determineDuration1(5)}</td>
                <td style={contourBottomRight}>{determineDuration1(6)}</td>
            </tr>
            <tr>
                <td style={contourLeftTop} className="table-left-atr">Session2</td>
                <td style={{textTransform:"capitalize"}}>{determineSession2(0)}</td>
                <td style={{textTransform:"capitalize"}}>{determineSession2(1)}</td>
                <td style={{textTransform:"capitalize"}}>{determineSession2(2)}</td>
                <td style={{textTransform:"capitalize"}}>{determineSession2(3)}</td>
                <td style={{textTransform:"capitalize"}}>{determineSession2(4)}</td>
                <td style={{textTransform:"capitalize"}}>{determineSession2(5)}</td>
                <td style={contourRight}>{determineSession2(6)}</td>
            </tr>
            <tr>
                <td style={contourLeft} className="table-left-atr">RPE</td>
                <td>{determineRPE2(0)}</td>
                <td>{determineRPE2(1)}</td>
                <td>{determineRPE2(2)}</td>
                <td>{determineRPE2(3)}</td>
                <td>{determineRPE2(4)}</td>
                <td>{determineRPE2(5)}</td>
                <td style={contourRight}>{determineRPE2(6)}</td>
            </tr>
            <tr>
                <td style={contourBottomLeft} className="table-left-atr">Duration</td>
                <td style={contourBottom}>{determineDuration2(0)}</td>
                <td style={contourBottom}>{determineDuration2(1)}</td>
                <td style={contourBottom}>{determineDuration2(2)}</td>
                <td style={contourBottom}>{determineDuration2(3)}</td>
                <td style={contourBottom}>{determineDuration2(4)}</td>
                <td style={contourBottom}>{determineDuration2(5)}</td>
                <td style={contourBottomRight}>{determineDuration2(6)}</td>
            </tr>
            <tr>
                <td style={contourBottomLeft} className="table-left-atr-bottom">Total Load <br></br>{findLoadForCurrentWeek()}<br></br>W-TO-W<br></br>{findWtoW()}</td>
                <td style={contourBottom}>{determineLoad(0)}</td>
                <td style={contourBottom}>{determineLoad(1)}</td>
                <td style={contourBottom}>{determineLoad(2)}</td>
                <td style={contourBottom}>{determineLoad(3)}</td>
                <td style={contourBottom}>{determineLoad(4)}</td>
                <td style={contourBottom}>{determineLoad(5)}</td>
                <td style={contourBottomRight}>{determineLoad(6)}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeamSummaryTrainingLoad;
