'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('name_enterprise')
      table.string('path')
      table.string('contact')
      table.string('social')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
