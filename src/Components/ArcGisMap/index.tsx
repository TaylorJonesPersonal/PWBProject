'use client';
import "@arcgis/map-components/dist/components/arcgis-map";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import { TargetedEvent } from "@esri/calcite-components";
import { useRef, useEffect} from "react";
import { ArcGisMapParams } from "./types";

export default function ArcGisMap({toggleShow, mapId}: ArcGisMapParams) {
    const mapRef = useRef<HTMLArcgisMapElement>(null);

  useEffect(() => {
    const mapElement = mapRef.current;
    
    if (mapElement) {
      // Wait for the component to be ready
      mapElement.addEventListener("arcgisViewReadyChange", (event: TargetedEvent<ArcgisMap, void>) => {
        const view = event.target.view;
        // Set constraints to prevent zooming out too far
        // A value of 3 or 4 typically keeps the map from looking like a small square
        view.constraints = {
          minZoom: 3,
          maxZoom: 20
        };
      });
    }
  }, []);

    return(
        <div style={{height: "100vh", width: "100%"}}>
          {toggleShow && (        
            <arcgis-map
              ref={mapRef}
              item-id={mapId}
              center="-122.683301, 45.515765"
              zoom={12}
            >
              <arcgis-zoom slot='bottom-left'/>
            </arcgis-map>
          )}
        </div>
    );
}