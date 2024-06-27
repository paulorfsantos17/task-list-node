import { Database } from "./database.js"
import { buildRouterPath } from "./utils/build-router-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRouterPath('/tasks'),
    handler: (request, response) => {
      const tasks = database.select('tasks')

      return response.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRouterPath('/tasks'),
    handler: (request, response) => {

      const { title, description } = request.body

      if (!title || !description) {
        return response.writeHead(400).end('Necessário inserir titulo e descrição.')
      }
      const data = {
        title,
        description,
      }
      database.create('tasks', data)

      return response.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRouterPath('/tasks/:id'),
    handler: (request, response) => {
      database.delete('tasks', request.params.id)

      return response.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRouterPath('/tasks/:id'),
    handler: (request, response) => {

      const { title, description } = request.body

      if (!title || !description) {
        return response.writeHead(400).end('Necessário inserir titulo e descrição.')
      }
      const data = {
        title,
        description,
      }

      database.update('tasks', request.params.id, data)

      return response.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRouterPath('/tasks/:id/completed'),
    handler: (request, response) => {
      database.completedTask('tasks', request.params.id)

      return response.writeHead(204).end()
    }
  }
]