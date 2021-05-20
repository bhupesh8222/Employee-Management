Employee management system , created with MERN stack.

Complete aplication has been created as per "required document".

Using session based authentication for users. Charts & graphs are created using Chart.js & Canvas.js.
Used cloud MongoDD atlas database with express framework


Following routes have been setup at backend -

1. Authentication - login/logout/register (authentication.js in server folder)
2. "/placeorder" - for placing and order and saving it in database (index.js)
3. "/report" - for getting the orders by date, orders by quantity/sales for plotting .
4. "/ratelist" - for getting ratelist stored in database

In the client side , under components folder following components have made-

1. Login 
2. Home
3. Add Order
4. Report
	
& their corresponding css files

createBarGraph, createLineChart, createPieChart - helper files to plot the graph

