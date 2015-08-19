var express = require("express");
var router = express.Router();
var DB = require("../../db/connection.js")
var List = DB.models.List;
var Task = DB.models.Task;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/lists", function(req, res){
  return res.json(List);
});

router.post("/lists", function(req, res){
  List.push(req.body);
  return res.json(req.body);
});

router.get("/lists/:id", function(req, res){
  for(var l = 0; l < List.length; l++){
    if(List[l].id == req.params.id){
      return res.json(List[l]);
    }
  }
});

router.put("/lists/:id", function(req, res){
  for(var l = 0; l < List.length; l++){
    if(List[l].id == req.params.id){
      List[l] = req.body;
      return res.json(List[l]);
    }
  }
  return error(res, "not found");
});

router.delete("/lists/:id", function(req, res){
  for(var l = 0; l < List.length; l++){
    if(List[l].id == req.params.id){
      delete List[l];
      return res.json(List[l]);
    }
  }
  return error(res, "not found");
});

module.exports = router;
