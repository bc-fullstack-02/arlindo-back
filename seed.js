const {
  Connection,
  Redact
} = require('./models')

module.exports = Connection
  .then(() => Promise.all([
    'barba',
    'pestinha', // g1
    'morticia' // g2
  ].map(term => new Redact({ term }).save())))
  .then(() => console.log('mongo is seeded'))
