import { MongoClient, ObjectId } from 'mongodb'

import fs from 'fs'

// get credentials from secret.json file
const secret = JSON.parse(fs.readFileSync('secret.json', 'utf8'))

// MongoDB connection
const url = `mongodb+srv://${secret.username}:${secret.password}@cluster0.ojaqaxf.mongodb.net/`
const database = 'CS-404'
const collection = 'BoardGames'
const client = new MongoClient(url, { useUnifiedTopology: true })

export default class GameController {
  async GetAllGames () {
    try {
      // connect to the cluster
      await client.connect()

      // connects to the db
      const db = client.db(database)

      // connects to the collection
      const col = db.collection(collection)

      // gets the game documents
      const documents = await col.find().toArray()

      // return the documents
      return documents
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      await client.close()
    }
  }

  async GetFullGame (id) {
    try {
      // connect to the cluster
      await client.connect()

      // connects to the db
      const db = client.db(database)

      // connects to the collection
      const col = db.collection(collection)

      // gets the game document
      const document = await col.findOne({ _id: new ObjectId(id) })

      // return the document
      return document
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      await client.close()
    }
  }

  async AddGame (game) {
    try {
      // connect to the cluster
      await client.connect()

      // connects to the db
      const db = client.db(database)

      // connects to the collection
      const col = db.collection(collection)

      // insert the game document
      await col.insertOne(game)

      // return the document
      return game
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      await client.close()
    }
  }

  async DeleteGame (id) {
    try {
      // connect to the cluster
      await client.connect()

      // connects to the db
      const db = client.db(database)

      // connects to the collection
      const col = db.collection(collection)

      // delete the game document
      await col.deleteOne({ _id: new ObjectId(id) })

      // return the document
      return id
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      await client.close()
    }
  }
}
