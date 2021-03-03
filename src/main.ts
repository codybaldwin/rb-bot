import { hooks } from '@feathersjs/hooks/lib';
import Discord from 'discord.js'
import { raidBossAddController } from './features/raid-boss-add';
import { getContextMiddleware } from './middleware/context-middleware';
import { loggerMiddleware } from './middleware/logger-middleware';
import { raidBossTodController } from './features/raid-boss-tod';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const controllers = [
  raidBossAddController,
  raidBossTodController,
]

client.on('message', async msg => {
  if (msg.author.bot) {
    return
  }
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
  for await (const controller of controllers) {
    const { command, handler, middleware } = controller
    let match = false
    let params
    if (command instanceof RegExp) {
      const regexResult = command.exec(msg.content)
      console.log(regexResult, command, msg.content)
      if (regexResult) params = regexResult.groups
      match = regexResult && regexResult.length > 0
    } else {
      match = command === msg.content.trim()
    }
    if (match) {
      await (hooks(handler, [getContextMiddleware(msg, params, command), loggerMiddleware, ...middleware]))({
        command,
        params,
        message: msg,
      })
    }
  }
});

client.login(process.env.BOT_TOKEN);

// permissions 
// https://discord.com/oauth2/authorize?client_id=816150526651662336&permissions=3490184273&scope=bot
// 3490184273