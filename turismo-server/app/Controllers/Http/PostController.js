'use strict'
const Post = use('App/Models/Post')
const Helpers = use('Helpers')
const Env = use('Env')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {

  async index ({ request, response, view }) {
    const data = Post.all()
    return data;
  }

 

 
  async store ({ request, response }) {
    const data = request.only(['name_enterprise','contact','social'])
    const validadeOptions = {
      types:['image'],
      size:'2mb'
    }
    const file = request.file('file',validadeOptions)
    
    
    
    await file.move(Helpers.tmpPath('uploads'),{
      name:`${new Date().getTime()}.${file.subtype}`
    })
    if (!file.moved()){
      return file.error()
    }
    const fileModel = await Post.create({
      name_enterprise:data.name_enterprise,
      contact:data.contact,
      social:data.social,
      path:`${Env.get('APP_URL')}/files/${file.fileName}`,
    })
    return fileModel
  }


  async show ({ params, request, response, view }) {
    const data = await Post.findOrFail(params.id)
    return data
  }


  async update ({ params, request, response }) {
  }

  
  async destroy ({ params, request, response }) {
    const data = await Post.findOrFail(params.id)
    data.delete()
    return ({mensage:"Destroy Sucess"})
  }

  async show_img({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.file}`))
  }
}

module.exports = PostController
