# Parse the Parcel #

At Trade Me we're looking to make selling items even easier and so we've decided to build our very own package shipping network. We've dug a tunnel between the North and South Islands that enables us to offer the same rates for parcels sent anywhere in the country, and we've just finished fueling up our fleet of courier vans; all that remains to be done is to update the website so that users can be advised how much their items will cost to send.

Our new service shipping costs are based on size and we offer different prices for small, medium, and large boxes. Unfortunately we're currently unable to move heavy packages so we've placed an upper limit of 25kg per package.

| Package Type | Length | Breadth | Height | Cost |
| --- | --- | --- | --- | --- | --- |
| Small | 200mm | 300mm | 150mm | $5.00 |
| Medium | 300mm | 400mm | 200mm| $7.50 |
| Large | 400mm | 600mm | 250mm | $8.50 |

## Description ##

Parse-the-parcel implements a RESTful JSON HTTP server microservice that, when supplied the dimensions (length x breadth x height) and weight of a package, can advise on the cost and type of package required. If the package exceeds these dimensions - or is over 25kg - then the service does not return a packaging solution.

## Installation

The application can be installed natively via npm and node 10/latest
```bash
$ npm install
```

Or alternatively built using docker
```bash
$ docker build --tag parsetheparcel .
```

## Running the app

The application listens on port 3000 for incoming HTTP requests supported as per the documentation.

```bash
$ npm run start       # Development
$ npm run start:dev   # Watch Mode
$ npm run start:prod  # Production Mode
$ docker run -p 3000:3000 parsetheparcel
```

## Documentation

An informational endpoint listens on the server root `/`. This is also useful for health checking the application.

Functional endpoints are documented via an autogenerated OpenAPI (Swagger) HTML document hosted by the server.
Ensure the application server is running as above and navigate to `/docs` to explore and query the application.

```bash
$ sensible-browser 'http://localhost:3000/'
```

## Tests

```bash
$ npm run test        # Unit tests
$ npm run test:e2e    # End to end tests
$ npm run test:cov    # Coverage report
```
