import { Controller } from '../controller/controler-base';
import { RaidBoss, IRaidBoss } from '../models/raid-boss';
import { RaidBossConfig, IRaidBossConfig } from '../models/raid-boss-config';
import * as chrono from 'chrono-node';
import moment from 'moment-timezone';
import { RaidBossTOD, IRaidBossTOD } from '../models/raid-boss-tod';

const expr = /^!rbtod\s(?<name>\w+)\s(?<when>.+)/i
export const raidBossTodController = new Controller(expr, async (ctx) => {
  const { message } = ctx
  const { name, when } = ctx.params
  console.debug(name, when)
  const raidBoss = await RaidBoss.findOne<IRaidBoss>({name: new RegExp(name, 'i')})
  if (!raidBoss) {
    await message.reply(`Raid Boss does not exists\nTo configure please use \`!rbadd\` command`)
    return
  }
  const raidBossConfig = await RaidBossConfig.findOne<IRaidBossConfig>({ raidboss: raidBoss._id })
  const tod = moment(chrono.parseDate(when)).utc();
  const nextRespawnStarts = tod.clone().add(raidBossConfig.respawn + raidBossConfig.respawnStart, 'hours')
  const nextWindowEnds = nextRespawnStarts.clone().add(raidBossConfig.windowDuration, 'hours')

  await RaidBossTOD.insert<IRaidBossTOD>({
    nextRespawnStart: nextRespawnStarts.toDate(),
    raidboss: raidBoss._id,
    respawnWindowEnd: nextWindowEnds.toDate(),
    timeOfDeath: tod.toDate(),
    windowSize: raidBossConfig.windowDuration,
  })
  message.reply(`TOD: ${tod.format('LLLL Z')}\nNext Respawn Starts: ${nextRespawnStarts.format('LLLL Z')}`)
  console.debug(`Raid Found`, tod, raidBoss, raidBossConfig)
})
