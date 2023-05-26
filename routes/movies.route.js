import express from "express";
import { client } from "../index.js";
const router = express.Router();

/* /movies - Display all movie data  */
/* Send -> JSON */

router.get("/", async function (request, response) {
    // db.movies.find({})
  
    if(request.query.rating){
      request.query.rating = +request.query.rating;
    }
  
    console.log(request.query);
  
    //cursor -> pagination | toArray
    const movies = await client
    .db("training")
    .collection("movies")
    .find(request.query).toArray();
    response.send(movies);
  });
  
  // /movies/:id
  
  router.get("/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.findOne({id: "101"})
  
    console.log(id);
    // const movie = movies.find((mv) => mv.id == id);
    const movie = await client
      .db("training")
      .collection("movies")
      .findOne({ id: id });
    console.log(movie);
    movie
      ? response.send(movie)
      : response.status(404).send({ msg: "Movie not found" });
  });
  
  router.post("/", async function (request, response) {
    const data = request.body;
    // console.log(data);
    // db.movies.insertMany(data)
  
    const result = await client.db("training").collection("movies").insertMany(data);
  
    response.send(result);
  });
  
  // /movies/:id   to delete
  
  router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.deleteOne({id: "101"})
  
    console.log(id);
    const result = await client
      .db("training")
      .collection("movies")
      .deleteOne({ id: id });
    console.log(result);
    result.deletedCount > 0
      ? response.send({ msg : "Movie was deleted successfully" })
      : response.status(404).send({ msg: "Movie not found" });
  });
  
  // /movies/:id  to update | put
  
  router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    console.log(data);
    // db.movies.updateOne({id: "101"}, { $set: data })
  
    console.log(id);
    // const movie = movies.find((mv) => mv.id == id);
    const result = await client
      .db("training")
      .collection("movies")
      .updateOne({id: id}, { $set: data });
    console.log(result);
    result
      ? response.send(result)
      : response.status(404).send({ msg: "Movie not found" });
  });

  export default router;
  