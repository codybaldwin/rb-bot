import { IMessageMiddlewareFn } from "../controller/controler-base";

export const loggerMiddleware: IMessageMiddlewareFn = async (ctx, next) => {
  console.debug('Command', ctx.message.content, ctx.params)
  await next()
  console.debug('Command')
}