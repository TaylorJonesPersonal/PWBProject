'use client';
/// <reference types="@esri/calcite-components/types/react" />
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-action-bar";
import "@esri/calcite-components/components/calcite-panel";
import Image from "next/image";
import { CalciteShellParams } from "./types";

export default function CalciteShell ({children, toggleMap, toggleGroundWater}: CalciteShellParams) {
    return(
<calcite-shell>
    <calcite-shell-panel slot="panel-start" id="shell-panel-start">
        <Image loading='eager' src={'/portland-water.png'} alt={'Portland Water Bureau Logo'} width={0} height={0} sizes={'100vw'} style={{width: '100%', height: 'auto'}} />
        {/*
        <calcite-action-bar slot="action-bar">
            <calcite-action text="Save" icon="save" indicator text-enabled></calcite-action>
            <calcite-action active icon="map" text="Map" text-enabled></calcite-action>
            <calcite-action icon="layer" text="Layer" text-enabled></calcite-action>
        </calcite-action-bar>
        */}
        <calcite-panel heading="Address Entry" id="panel-start">
                <calcite-input-text placeholder={'Street Address'}></calcite-input-text>
                <calcite-input-text placeholder={'Zip Code'}></calcite-input-text>
                <div style={{marginTop: 25, marginLeft: 10}}>
                    <calcite-switch oncalciteSwitchChange={toggleGroundWater} labelTextStart={'Toggle Groundwater'}></calcite-switch>
                    <div style={{marginTop: 15}}>
                        <calcite-button onClick={toggleMap} type={'button'}>{'Apply'}</calcite-button>
                    </div>
                </div>
        </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end" id="shell-panel-end" collapsed>
        <calcite-action-bar slot="action-bar">
                    {/*
            <calcite-action text="Layer" icon="sliders-horizontal" text-enabled></calcite-action>
            <calcite-action text="Styles" icon="shapes" text-enabled></calcite-action>
            <calcite-action text="Filter" icon="layer-filter" text-enabled></calcite-action>
            <calcite-action text="Configure" icon="popup" text-enabled></calcite-action>
                    */}
        </calcite-action-bar>
    </calcite-shell-panel>
    <calcite-panel heading="The Path Your Water Takes">
        <div style={{height: '100%', width: '100%'}}>
            {children}
        </div>
    </calcite-panel>
</calcite-shell>
    )
}