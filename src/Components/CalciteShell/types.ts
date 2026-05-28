import { RouteData } from "../../types";
import { ReactNode } from "react";

export interface CalciteShellParams {
    toggleGroundWater: () => void;
    toggleMap: () => void;
    children?: ReactNode;
}