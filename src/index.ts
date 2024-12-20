import express from 'express';
import { initDB, getCountFromColumn, getCountFromColumnAndValue } from './sqlConnection';
import { ColumnCount } from 'model.projection';

const app = express();
app.listen(4000, () => {
  console.log(`server running on port 4000`);
});

app.get("/Attribute", (_req, res) => {
  getCountFromColumn('attribute', (ret: ColumnCount[]) => {
    const counts = new Map<string, number>();
    ret.forEach((columnCount) => {
      counts.set(columnCount.value, columnCount.count);
    });

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/Attribute/:value", (req, res) => {
  const value = req.params.value;

  getCountFromColumnAndValue('attribute', value, (ret: ColumnCount) => {
    const counts = new Map<string, number>();
    counts.set(ret.value, ret.count);

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/Commodity", (_req, res) => {
  getCountFromColumn('commodity', (ret: ColumnCount[]) => {
    const counts = new Map<string, number>();
    ret.forEach((columnCount) => {
      counts.set(columnCount.value, columnCount.count);
    });

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/Commodity/:value", (req, res) => {
  const value = req.params.value;

  getCountFromColumnAndValue('commodity', value, (ret: ColumnCount) => {
    const counts = new Map<string, number>();
    counts.set(ret.value, ret.count);

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/CommodityType", (_req, res) => {
  getCountFromColumn('commoditytype', (ret: ColumnCount[]) => {
    const counts = new Map<string, number>();
    ret.forEach((columnCount) => {
      counts.set(columnCount.value, columnCount.count);
    });

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/CommodityType/:value", (req, res) => {
  const value = req.params.value;

  getCountFromColumnAndValue('commoditytype', value, (ret: ColumnCount) => {
    const counts = new Map<string, number>();
    counts.set(ret.value, ret.count);

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/Units", (_req, res) => {
  getCountFromColumn('units', (ret: ColumnCount[]) => {
    const counts = new Map<string, number>();
    ret.forEach((columnCount) => {
      counts.set(columnCount.value, columnCount.count);
    });

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/Units/:value", (req, res) => {
  const value = req.params.value;

  getCountFromColumnAndValue('units', value, (ret: ColumnCount) => {
    const counts = new Map<string, number>();
    counts.set(ret.value, ret.count);

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/YearType", (_req, res) => {
  getCountFromColumn('yeartype', (ret: ColumnCount[]) => {
    const counts = new Map<string, number>();
    ret.forEach((columnCount) => {
      counts.set(columnCount.value, columnCount.count);
    });

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/YearType/:value", (req, res) => {
  const value = req.params.value;

  getCountFromColumnAndValue('yeartype', value, (ret: ColumnCount) => {
    const counts = new Map<string, number>();
    counts.set(ret.value, ret.count);

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/Year", (_req, res) => {
  getCountFromColumn('year', (ret: ColumnCount[]) => {
    const counts = new Map<string, number>();
    ret.forEach((columnCount) => {
      counts.set(columnCount.value, columnCount.count);
    });

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

app.get("/Year/:value", (req, res) => {
  const value = req.params.value;

  getCountFromColumnAndValue('year', value, (ret: ColumnCount) => {
    const counts = new Map<string, number>();
    counts.set(ret.value, ret.count);

    const obj = Object.fromEntries(counts);
    const json = JSON.stringify(obj);

    console.log(json);
    res.send(json);
  });
});

function setup() {
  initDB();
}

// Call setup after 7 seconds (7000 milliseconds)
// Allows time for DB initialization to complete.
setTimeout(setup, 7000);
