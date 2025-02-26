/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  let toDoList=[];
  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();

  app.use(bodyParser.json());
  app.get("/todos",function(req,res)
  {
    // const numberOfItems=toDoList.length;
    // for(let i=0;i<numberOfItems;i++)
    // {
    //   const title=toDoList[i].title;
    //   const description=toDoList[i].description;
    //   const id=toDoList[i].id;
    //   toDoTemp.push({title:title,description:description,id:id});
    // }
    res.json(toDoList);
  })

  app.get("/todos/:id",function(req,res){
    const toDoId=req.params.id;
    const numberOfItems=toDoList.length;
    let flag=false;
    for(let i=0;i<numberOfItems;i++)
    {
      const idNumber=toDoList[i].id;
      if(idNumber==toDoId)
      {
        flag=true;
        res.json(toDoList[i]);
      }
    }
    if(flag==false)
    {
      res.status(404).send("Id not found")
    }
  })

  app.post("/todos",function(req,res){
    const title=req.body.title;
    const description=req.body.description;
    const isCompleted=req.body.completed;
    const id=new Date().valueOf();
    toDoList.push({title:title,description:description,id:id,completed:isCompleted})
    res.json(id);
  })

  app.put("/todos/:id",function(req,res){
    const status=req.body.completed;
    // console.log(status);
    const id=req.params.id;
    let flag=false;
    const numberOfItems=toDoList.length;
    for(let i=0;i<numberOfItems;i++)
    {
      if(toDoList[i].id==id)
      {
        flag=true;
        toDoList[i].completed=status;
        res.status(200).send("Status Updated")
      }
    }
    if(flag==false)
    {
      res.status(404).send("Id not found");
    }
  })

  app.delete("/todos/:id",function(req,res){
    let newToDoList=[];
    const id=req.params.id;
    let flag=false;
    const numberOfItems=toDoList.length;
    for(let i=0;i<numberOfItems;i++)
    {
      if(toDoList[i].id!=id)
      {
        newToDoList.push(toDoList[i]);
      }
      else{
        flag=true;
      }
    }
    if(flag==false)
    {
      res.status(404).send("Id not found")
    }
    else{
      toDoList=newToDoList;
      res.status(200).send("Todo item deleted");
    }
  })

  app.listen(3000,()=>{
    console.log("Server is listening to PORT 3000")
  })
  
  module.exports = app;