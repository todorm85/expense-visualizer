export interface Dataset {
    label: string;
    data: Array<{ x: Date; y: number; }>;
    backgroundColor;
    borderColor;
    fill: boolean;
  }