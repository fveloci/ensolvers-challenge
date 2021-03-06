import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })

  app.setGlobalPrefix(process.env.API_URL)
  await app.listen(3000)

  // NESTJS HotReload
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
