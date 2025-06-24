interface MongoDBConfiguration {
  connection_string: string
  database: string
}

export class Configuration {
  port: number = parseInt(process.env.PORT ?? '9000', 10)
  mongodb: MongoDBConfiguration = {
    connection_string: 'mongodb://localhost:27017',
    database: 'ddd',
  }
}

export default () => new Configuration()
