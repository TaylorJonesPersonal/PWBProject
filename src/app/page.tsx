'use client';
import { defineCustomElements } from "@esri/calcite-components/loader";
defineCustomElements();
import dynamic from "next/dynamic";
import { CalciteShellParams } from "@/Components/CalciteShell/types";
import { useState } from "react";
import { routeData } from "./data";

const MapComponent = dynamic(() => import('../Components/ArcGisMap'), {ssr: false, loading: () => <p>Loading...</p>});
const CalciteShellComponent = dynamic<CalciteShellParams>(() => import('../Components/CalciteShell'), {ssr: false, loading: () => <p>Loading...</p>});

export default function Home() {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [groundWater, setGroundWater] = useState<boolean>(false);

  const handleToggleMap = () => {
    setShowMap(true);
  };

  const handleToggleGroundWater = () => {
    setGroundWater((prevState) => !prevState);
  }


  return (
  <CalciteShellComponent toggleMap={handleToggleMap} toggleGroundWater={handleToggleGroundWater}>
    <MapComponent mapId ={groundWater ? routeData[0]?.wellMapId : routeData[0]?.mapId} toggleShow={showMap}/>
    </CalciteShellComponent>
  );
}
