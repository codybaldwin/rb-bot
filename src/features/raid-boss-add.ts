import { Controller } from '../controller/controler-base';
import { RaidBoss, IRaidBoss } from '../models/raid-boss';
import { RaidBossConfig, IRaidBossConfig } from '../models/raid-boss-config';
const expr = /^!rbadd\s(?<name>\w+)\s(?<respawnHours>\d+)\s(?<spawnStart>-{0,1}\d+)\s(?<windowDuration>\d+)/i
export const raidBossAddController = new Controller(expr, async (ctx) => {
  const { message } = ctx
  const { name, respawnHours, spawnStart, windowDuration } = ctx.params
  const exists = await RaidBoss.findOne({name})
  if (exists) {
    await message.reply(`Raid Boss already exists`)
    return
  }
  const raidBoss = await RaidBoss.insert<IRaidBoss>({
    name,
  })
  await RaidBossConfig.insert<IRaidBossConfig>({
    guild: message.guild.id,
    raidboss: raidBoss._id,
    respawn: parseInt(respawnHours),
    windowDuration: parseInt(windowDuration),
    respawnStart: parseInt(spawnStart),
  })
  message.reply(`Raid Boss successfully added...!`)
})
