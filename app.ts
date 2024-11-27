import * as Papa from 'papaparse';
import * as fs from 'fs';

interface Projection {
    attribute: string;
    commodity: string;
    commondityType: string;
    units: string;
    yearType: string;
    year: string;
    value: number;
}

export function columnCount(filePath: string, columnName: string): number {
    let count: number = 0;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        
        Papa.parse<Projection>(data, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                const projections = results.data;
                console.log(projections);

                const counts = new Map<Projection, number>();

                projections.forEach((projection) => {
                    if(counts.has(projection[columnName])) {
                        counts.set(projection[columnName], counts.get(projection[columnName])! + 1)
                    } else {
                        counts.set(projection[columnName], 1);
                    }
                })

                console.log(counts);
            }
        });
    })

    return count;
}

columnCount('./Projection2021.csv', 'Commodity');