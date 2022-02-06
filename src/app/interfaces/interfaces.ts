export interface Endpoints {
    httpPort: number;
    httpUpdatesPort: number;
}

export interface CameraInfo {
    api?: string[];
    apiLevel?: number[];
    _bluetoothMacAddress?: string;
    endpoints?: Endpoints;
    firmwareVersion?: string;
    gps?: boolean;
    gyro?: boolean;
    manufacturer?: string;
    model?: string;
    serialNumber?: string;
    supportUrl?: string;
    uptime?: number;
    _wlanMacAddress?: string;
}

export interface WifiData {
    level?: number;
    SSID?: string;
    BSSID?: string;
    frequency?: number;
    capabilities?: string;
    timestamp?: any;
    channelWidth?: number;
    centerFreq0?: number;
    centerFreq1?: number;
}

export interface CameraFile {
    dateTimeZone?: string;
    fileUrl?: string;
    height?: number;
    isProcessed?: boolean;
    name?: string;
    previewUrl?: string;
    _projectionType?: string;
    size?: number;
    _thumbSize?: number;
    thumbnail?: string;
    width?: number;
    lat?: number;
    lng?: number;
}