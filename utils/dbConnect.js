import mongoose from 'mongoose'

const connection = {}

async function dbConnect() {
      if(connection.isConnected) {
            return
      }

      const db = await mongoose.connect("mongodb+srv://dbgobbe:dbgbb05bbe@cluster0.fo1f1.mongodb.net/emmas-nagelstudio?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      })

      connection.isConnected = db.connections[0].readyState
      console.log(connection.isConnected)
}

export default dbConnect