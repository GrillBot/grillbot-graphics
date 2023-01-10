import { LayoutPosition } from "chart.js";

export interface ChartOptions {
    width: number;
    height: number;
    backgroundColor: string;
    type: 'line';
    legendPosition?: LayoutPosition,
    pointRadius?: number
}

export interface Label {
    text: string;
    align: 'start' | 'end' | 'center';
    size: number;
    color: string;
    weight: string;
}

export interface ChartData {
    topLabel?: Label;
    labels: string[];
    datasets: Dataset[];
}

export interface Dataset {
    label: string;
    data: number[];
    color?: string;
    width?: number;
}

export interface RequestData {
    options: ChartOptions;
    data: ChartData;
}
