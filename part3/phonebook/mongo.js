const mongoose = require('mongoose')

if (process.argv.length < 3 ) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length > 5 ) {
  console.log('The command only needs password, name an phone: node mongo.js <password> <name> <phone>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@cluster0.h44xpea.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id:  mongoose.Schema.Types.ObjectId,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {

  const name = process.argv[3]
  const phone = process.argv[4]

  const person = new Person({
    name: name,
    number: phone,
  })

  person.save().then(() => {
    console.log(`Added ${name} number ${phone} to phonebook`)
    mongoose.connection.close()
    process.exit(1)
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name+' '+person.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}






