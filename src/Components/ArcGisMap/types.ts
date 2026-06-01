export interface PopoverOptions {
    visible?: boolean;
    x: number;
    y: number;
    data: PopoverDetails | null;
}

export interface PopoverDetails {
    heading: string;
    description: string;
    base64Image?: string;
}

export interface ArcGisMapParams {
    toggleShow: boolean;
    mapId: string;
}