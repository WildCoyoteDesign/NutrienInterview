"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnCount = columnCount;
var Papa = require("papaparse");
var fs = require("fs");
function columnCount(filePath, columnName) {
    var count = 0;
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                var projections = results.data;
                console.log(projections);
                var counts = new Map();
                projections.forEach(function (projection) {
                    if (counts.has(projection[columnName])) {
                        counts.set(projection[columnName], counts.get(projection[columnName]) + 1);
                    }
                    else {
                        counts.set(projection[columnName], 1);
                    }
                });
                console.log(counts);
            }
        });
    });
    return count;
}
columnCount('./Projection2021.csv', 'Commodity');
