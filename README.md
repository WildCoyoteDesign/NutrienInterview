# Nutrien Interview Task Application
As part of interviewing with Nutrien I was given the task of creating a simple Node application in TypeScript.  The application was to pull in a CSV file and then have API endpoint that would query counts within
the colums of the data.

## Endpooints
The following are the endpoints requested in this interview task.  
All of the endpoints have a JSON return in the format of:  
> { * *value* *: X, * *count* * }.
- **Attribute Endpoints**
  - GET /Attribute
    - Returns a summary of attribute counts in the format: { "Harvested acres": X,  "Beef": Y, …}
  - GET /Attribute/:value
    - Returns the count for a specific attribute: { "Harvested acres": X }
- **Commodity Endpoints**
  - GET /Commodity
    - Returns a summary of commodity counts in the format: { "Rice": X,  "Barley": Y, …}
  - GET /Commodity/:value
    - Returns the count for a specific commodity: { "Rice": X }
- **CommodityType Endpoints**
  - GET /CommodityType
    - Returns a summary of commodity type counts in the format: { "Crops": X,  "Livestock/Dairy": Y, …}
  - GET /CommodityType/:value
    - Returns the count for a specific commodity type: { "Crops": X }
- **Units Endpoints**
  - GET /Units
    - Returns a summary of units counts in the format: { "Thousand acres": X,  "Pounds per capita": Y, …}
  - GET /Units/:value
    - Returns the count for a specific units: { "Thousand acres": X }
- **YearType Endpoints**
  - GET /YearType
    - Returns a summary of year type counts in the format: { "Market year": X,  "Calendar year": Y, …}
  - GET /YearType/:value
    - Returns the count for a specific year type: { "Market year": X }
- **Year Endpoints**
  - GET /Year
    - Returns a summary of year counts in the format: { "2019/20": X,  "2019": Y, …}
  - GET /Year/:value
    - Returns the count for a specific year: { "2019/20": X }

## Building the app locally
The application is written so that it can be run from within Docker containers.  There is a Makefile provided to ease this process.  
Two docker images get built.  One for the application: **ts-node-docker**, and one for the [MySQL](https://www.mysql.com) image: **mysql**
### Prerequisite
- [Docker](https://www.docker.com) must be installed on your local machine.
- [Node](https://nodejs.org/en) must be installed on your local machine.
  - Note: I developed this applcation using Node version 23.3.0.
### Build and run
```
make up
```
### Teardown
```
make down
```

## Testing the app locally
The application is written where it will run locally at port 4000.  Once the application is built and running, the endpoints can be called from any tool that supports HTTP call, such as a web browser
or [Postman](https://www.postman.com) or Curl.
### Curl example:
```
curl -v http://localhost:4000/Commodity
```

Example output:
```
* Host localhost:4000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:4000...
* Connected to localhost (::1) port 4000
> GET /Commodity HTTP/1.1
> Host: localhost:4000
> User-Agent: curl/8.7.1
> Accept: */*
> 
* Request completely sent off
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 263
< ETag: W/"107-41PLjdrT8MVT58NdfzlGmJhPpdM"
< Date: Thu, 05 Dec 2024 14:42:56 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"Rice":216,"Barley":228,"Corn":240,"Upland Cotton":204,"Oats":228,"Sorghum":228,"Soybeans":228,"Wheat":240,"Egg":132,"Per capita meat consumption, retail weight":120,"Beef":192,"Pork":144,"Dairy":72,"Chicken":108,"Turkey":96,"Soybean oil":132,"Soybean meal":120}%
```
