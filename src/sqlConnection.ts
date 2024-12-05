import mysql, { Connection } from 'mysql2';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import { Projection, ColumnCount } from 'model.projection';

// NOTE: in a real world set up, these would be parameratized and would not be checked into the repo.
let _connection: Connection;
function connection(): Connection {
  if(_connection === undefined) {
    _connection = mysql.createConnection({
      host: 'nutrien-db',
      port: 3306,
      user: 'root',
      password: 'pass',
      database: 'nutrien_db'
    });
  }

  return _connection;
}

export function initDB() {
  let con = connection();

  con.connect((err) => {
    if (err) throw err;

    let sql = `CREATE TABLE projections (
      attribute VARCHAR(255), 
      commodity VARCHAR(255), 
      commoditytype VARCHAR(255), 
      units VARCHAR(255), 
      yeartype VARCHAR(255), 
      year VARCHAR(255), 
      value FLOAT(2))`;
    con.query(sql, function (err, _result) {
      if (err) throw err;
    });

    console.log("Table created...");

    fs.readFile('./src/Projection2021.csv', 'utf-8', (err, data) => {
      if(err) {
          console.error(err);
          return;
      }

      Papa.parse<Projection>(data, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            const projections = results.data;

            projections?.forEach((projection) => {
              insertProjection(projection);
            });
          }
        });
    });
  });
}

export function getCountFromColumn(columnName: string, callback: (ret: ColumnCount[]) => void) {
  let con = connection();

  con.connect((err) => {
    if (err) throw err;

    let sql = `SELECT ${columnName} as value, COUNT( ${columnName} ) as count FROM projections GROUP BY ${columnName}`;
    con.query<ColumnCount[]>(sql, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  });
}

export function getCountFromColumnAndValue(columnName: string, value: string, callback: (ret: ColumnCount) => void) {
  let con = connection();

  con.connect((err) => {
    if (err) throw err;

    let sql = `SELECT ${columnName} as value, COUNT( ${columnName} ) as count FROM projections WHERE ${columnName} = '${value}'`;
    console.log("SQL: ", sql);
    con.query<ColumnCount[]>(sql, function (err, result) {
      if (err) throw err;
      callback(result[0]);
    });
  });
}

function insertProjection(projection: Projection) {
  let con = connection();

  con.connect((err) => {
    if (err) throw err;

    if(projection !== null && projection.Attribute !== null) {
      let sql = `INSERT INTO projections (
        attribute, 
        commodity, 
        commoditytype, 
        units, 
        yeartype, 
        year, 
        value
        ) VALUES (
          '${projection.Attribute}',
          '${projection.Commodity}',
          '${projection.CommodityType}',
          '${projection.Units}',
          '${projection.YearType}',
          '${projection.Year}',
          ${projection.Value}
        )
      `;
      con.query(sql, function (err, _result) {
        if (err) throw err;
      });
    }
  });
}