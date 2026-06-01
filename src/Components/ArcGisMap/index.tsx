'use client';
import "@arcgis/map-components/dist/components/arcgis-map";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import Image from "next/image";
import { TargetedEvent } from "@esri/calcite-components";
import { useRef, useState} from "react";
import { ArcGisMapParams, PopoverOptions } from "./types";
import { ClickEvent } from "@arcgis/core/views/input/types";
import React from "react";
import { TARGET_LOCATIONS } from "@/app/data";
import { TargetLocation } from "@/types";

export default function ArcGisMap({toggleShow, mapId}: ArcGisMapParams) {
    const mapRef = useRef<HTMLArcgisMapElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [popover, setPopover] = useState<PopoverOptions>({visible: false, x: 0, y: 0, data: null});


    const handleViewReady = (event: TargetedEvent<ArcgisMap, void>) => {
      const view = event.target.view;
      // Set constraints to prevent zooming out too far
      // A value of 3 or 4 typically keeps the map from looking like a small square
      view.constraints = {
        minZoom: 3,
        maxZoom: 20
      };
    };

    const handleMapClick = async (event: TargetedEvent<ArcgisMap, ClickEvent>) => {
      const {x, y} = event?.detail;
      const {latitude, longitude} = event?.detail?.mapPoint;
        console.log('latitude: ', latitude, ' longitude: ', longitude);
      const errorAllowedLatLong = 0.0025;
      const locationClicked = (latitude && longitude) ? TARGET_LOCATIONS?.find(
        (val: TargetLocation) => 
          Math.abs(val?.lat - latitude) < errorAllowedLatLong && Math.abs(val?.long - longitude) < errorAllowedLatLong
      ) : null;
      if(locationClicked) {
        console.log('POPOVER!');
        if(anchorRef?.current) {
          anchorRef.current.style.left = `${x}px`;
          anchorRef.current.style.top = `${y}px`;
        }
        setPopover({
          visible: true,
          x: x,
          y: y,
          data: {
            heading: locationClicked?.heading,
            description: locationClicked?.description,
            base64Image: locationClicked?.base64Image,
          }
        });
      } else {
        setPopover({
          visible: false,
          x: 0,
          y: 0,
          data: null
        });
      }
    };

    const handleMapScroll = () => {
      setTimeout(() => {
        setPopover({
          visible: false,
          x: 0,
          y: 0,
          data: null
        });
      }, 500);
    }

    return(
        <div style={{height: "100vh", width: "100%"}}>
          {toggleShow && (     
            <React.Fragment>   
            <arcgis-map
              id={'map-container'}
              ref={mapRef}
              onarcgisViewDrag={handleMapScroll}
              onarcgisViewClick={handleMapClick}
              onarcgisViewReadyChange={handleViewReady}
              onScroll={handleMapScroll}
              item-id={mapId}
              center="-122.683301, 45.515765"
              zoom={12}
            >
              <div 
                id={'anchor'}
                ref={anchorRef}
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  pointerEvents: 'none',
                }} 
                />
              <arcgis-zoom slot='bottom-left' id={'zoom'}/>
            </arcgis-map>
            <calcite-popover
              heading={popover?.data?.heading}
              open={popover?.visible}
              referenceElement={'anchor'}
              overlayPositioning={'fixed'}
              placement={'auto'}
              label={'Location Info'}
              style={{
                '--calcite-popover-corner-radius': '7px',
                '--calcite-popover-max-size-x': '200px',
              }}
              >
                {popover?.data?.base64Image ? (
                  <Image height='75' width='125' style={{alignSelf: 'center', marginTop: '5px', borderRadius: '3px'}} src={`data:image/png;base64,${popover?.data?.base64Image}`} alt='A diagram of the Portland Water System Resource' />
                ): null}
                <p style={{padding: '10px', fontFamily: 'font-geist-sans'}}>{popover?.data?.description}</p>
            </calcite-popover>
            </React.Fragment>
          )}
        </div>
    );
}