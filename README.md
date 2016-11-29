# Parse the Parcel #

At Trade Me we're looking to make selling items even easier and so we've decided to build our very own package shipping network. We've dug a tunnel between the North and South Islands that enables us to offer the same rates for parcels sent anywhere in the country and we've just finished fueling up our fleet of courier vans; all that remains to be done is to update the website so that users can be advised how much their items will cost to send.
With our new service shipping costs are based on size and we offer different prices for small, medium, and large boxes. Unfortunately we're currently unable to move heavy packages so we've placed an upper limit of 25kg per package.

| Package Type | Length | Breadth | Height | Cost |
| --- | --- | --- | --- | --- | --- |
| Small | 200mm | 300mm | 150mm | $5.00 |
| Medium | 300mm | 400mm | 200mm| $7.50 |
| Large | 400mm | 600mm | 250mm | $8.50 |

## Coding Exercise ##

We need you to implement a component that, when supplied the dimensions (length x breadth x height) and weight of a package, can advise on the cost and type of package required. If the package exceeds these dimensions - or is over 25kg - then the service should not return a packaging solution.

## Guidelines ##

You will be expected to produce a solution that solves the above problem; while this is a simple component we will be executing it in a production system so it will need to be production ready and supportable. We also expect that as our shipping capacity grows so too will our service offering - meaning that one day we might support Extra Large Packages, or Overweight services.
You are free to choose the technologies you think are best for the system though this should ideally align with the role you are applying for. You are welcome to make assumptions about the solution along with any improvements you think enhance or add value to the solution - though please be aware of the original scope.