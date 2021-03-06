import moment from "moment";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./componentsCss/PlayerSummary.css";
import PlayerSummaryHeader from "./PlayerSummaryComponents/PlayerSummaryHeader";
import PlayerSummaryOverview from "./PlayerSummaryComponents/PlayerSummaryOverview";
import PlayerSummaryHealth from "./PlayerSummaryComponents/PlayerSummaryHealth";

import TeamSummaryPerformance from "./TeamSummaryComponents/TeamSummaryPerformance";
import TeamSummaryTest from "./TeamSummaryComponents/TeamSummaryTest";
import PlayerSummaryTrainingLoad from "./PlayerSummaryComponents/PlayerSummaryTrainingLoad";
import PlayerSummaryTest from "./PlayerSummaryComponents/PlayerSummaryTest";
const PlayerSummary = (props) => {
  const [direction, setDirection] = useState();
  var refToday = moment();
  var totalPlayers = [];
  var players = props.players;
  players.map((value) => {
    if (!value.is_coach) totalPlayers.push(value);
  });
  const [activePlayer, setActivePlayer] = useState(totalPlayers[0]);
  //console.log(totalPlayers[0])
  const determineDataFor4Weeks = () => {
    const startDay = refToday.startOf("week").subtract(21, "d");
    //continue from here↑↑↑↑↑↑↑↑
  };

  useEffect(() => {
    //console.log(activePlayer)
    determineDataFor4Weeks();
  }, [totalPlayers, activePlayer]);
  return (
    <div className="team-summary" style={{ width: props.sideBarOnOff }}>
      <BrowserRouter>
        <PlayerSummaryHeader
          sideBarOnOff={props.sideBarOnOff}
          playerFromDashoard={props.playerFromDashoard}
          activePlayer={setActivePlayer}
          direction={setDirection}
          players={players}
        />
        <Switch>
          <Route path="/dashboard/player-summary/overview" exact>
            <PlayerSummaryOverview player={activePlayer} />
          </Route>
          <Route path="/dashboard/player-summary/training-load" exact>
            <PlayerSummaryTrainingLoad player={activePlayer} />
          </Route>
          <Route path="/dashboard/player-summary/test" exact>
            <PlayerSummaryTest player={activePlayer} players={players} />
          </Route>
          <Route path="/dashboard/player-summary/health" exact>
            <PlayerSummaryHealth player={activePlayer} players={props.players} />
          </Route>
        </Switch>
        <TeamSummaryPerformance players={props.players} />
      </BrowserRouter>
    </div>
  );
};

export default PlayerSummary;
