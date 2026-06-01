export interface RouteData {
    address: string;
    mapId: string;
    wellMapId: string;
    zip: number;
}

export interface TargetLocation {
    lat: number;
    long: number;
    heading: string;
    description: string;
    base64Image?: string;
}