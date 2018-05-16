const { has } = require('lodash')

module.exports = (schema, options = { silent: false }) => {
  let previousValue
  schema.eachPath((path, schemaType) => {
    if (schemaType.options.readonly) {
      schemaType.set(function(value) {
        previousValue = this[path] || value
        return previousValue
      })
    }
  })

  const preUpdate = function(next) {
    const update = this.getUpdate()
    schema.eachPath((path, schemaType) => {
      if (schemaType.options.readonly) {
        const modified = has(update, `$set.${path}`) || has(update, path)
        if (modified) {
          if (!options.silent) {
            throw new Error(`field ${path} is set to be readonly`)
          }
          if (update.$set) {
            update.$set[path] = previousValue
          } else {
            update[path] = previousValue
          }
        }
      }
    })
    next()
  }

  schema.pre('update', preUpdate)
  schema.pre('findOneAndUpdate', preUpdate)
}
