import { IMessageMiddlewareFn } from "../controller/controler-base";
import Discord from 'discord.js';

export const getContextMiddleware = (msg: Discord.Message, params: Record<string,string> = {}, command: string | RegExp): IMessageMiddlewareFn => async (ctx, next) => {
  ctx.message = msg
  ctx.params = params
  ctx.command = command
  await next()
}