import { HookContext, NextFunction } from '@feathersjs/hooks/lib';
import Discord from 'discord.js';

export type IHandlerContext = { message: Discord.Message, params: Record<string, string>, command: ICommand}
export type IMiddlewareContext = HookContext & IHandlerContext
export type IMessageMiddlewareFn = (ctx: IMiddlewareContext, next: NextFunction) => Promise<void>
export type IMessageHandler = (ctx: IHandlerContext) => Promise<void>
export type ICommand = string | RegExp
export class Controller {
  public readonly middleware: Array<IMessageHandler>
  public constructor(public readonly command: ICommand, public readonly handler: IMessageHandler, ...middleware: Array<IMessageHandler>) {
    this.middleware = middleware
  }
}