import React,{useState,useEffect} from 'react';
import "./componentsCss/Sidebar.css";
import { AiFillPieChart, AiOutlineTeam, AiOutlineBarChart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs'
import { MdShowChart } from 'react-icons/md'
import { BsCalendar } from 'react-icons/bs'
import logo from "../assets/logo.svg"
const SideMenu = (props) => {
   
    const[activeTab,setActiveTab] = useState('dashboard');
    const allTabs = ["dashboard","team_summary","player_summary","player_drilldown","calendar","tests"];
    const currentPath = window.location.pathname
    const currentPathArray = currentPath.split("/")
    
     useEffect(() => {
         if(currentPathArray[2]=="dashboard-panel") setActiveTab("dashboard")
         if(currentPathArray[2]=="team-summary") setActiveTab("team_summary")
         if(currentPathArray[2]=="player-summary") setActiveTab("player_summary")
         if(currentPathArray[2]=="calendar") setActiveTab("calendar")
          allTabs.map((el)=> {if(document.getElementById(el))document.getElementById(el).style.color = ""})
          if(document.getElementById(activeTab)) document.getElementById(activeTab).style.color="white"
    }, [activeTab])

    return (
        <div style={{display:props.hidn}}   className="menu-container">
            <div className="logo"><Link to={"/dashboard/dashboard-panel"}><img style={{width:"200px",height:"200px"}} src={logo}/></Link></div>
           <div className="side-menu">
                <Link onClick={()=>setActiveTab("dashboard")} className="list-menu-anchor" to={"/dashboard/dashboard-panel"}><div id="dashboard"   className="list-menu-item"><AiFillPieChart /> Dashboard</div></Link> {/*---Dashboard---*/}
                <Link onClick={()=>setActiveTab("team_summary")} className="list-menu-anchor" to={"/dashboard/team-summary/overview"}><div  id="team_summary" className="list-menu-item" ><AiOutlineTeam/> Team Summary</ div></Link>
                <Link onClick={()=>setActiveTab("player_summary")} className="list-menu-anchor" to={"/dashboard/player-summary/overview"}><div className="list-menu-item" id="player_summary"  className="list-menu-item"> <BsPerson/> Player Summmary</ div></Link>
                <Link onClick={()=>setActiveTab("calendar")} className="list-menu-anchor" to={"/dashboard/calendar"}><div className="list-menu-item" id="calendar"  className="list-menu-item"> <BsCalendar/> Calendar</div></Link>
               
            </div>
            
        </div>
    )
}

export default SideMenu
