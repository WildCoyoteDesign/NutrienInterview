import { RowDataPacket } from "mysql2";

export interface Projection {
    Attribute: string;
    Commodity: string;
    CommodityType: string;
    Units: string;
    YearType: string;
    Year: string;
    Value: number;
}

export interface ColumnCount extends RowDataPacket {
    value: string;
    count: number;
}