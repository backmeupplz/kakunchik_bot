// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import { bot } from './helpers/bot'
import { checkTime } from './middlewares/checkTime'
import { setupHelp } from './commands/help'
import { attachUser } from './middlewares/attachUser'

// Check time
bot.use(checkTime)
// Attach user
bot.use(attachUser)
// Setup commands
setupHelp(bot)

// Start bot
bot.startPolling()

bot.on('sticker', async (ctx) => {
  const sticker = ctx.message.sticker
  const poopStickers = [
    // https://t.me/addstickers/peepo_pack
    'AgADIwADtEzqKA',
    'AgADUgADtEzqKA',
    'AgADUwADtEzqKA',
    'AgADVAADtEzqKA',

    // https://t.me/addstickers/nanopeepo
    'AgADWAIAAh_2ths',
    'AgADbgIAAh_2ths',
    'AgADbwIAAh_2ths',
    'AgADcAIAAh_2ths',
    'AgADvwIAAh_2ths',
  ]
  if (poopStickers.includes((sticker as any).file_unique_id)) {
    const today = new Date()
    const todayString = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`
    let pooped = ctx.dbuser.pooped
    if (!pooped) {
      pooped = {}
    }
    if (pooped[todayString]) {
      pooped[todayString]++
    } else {
      pooped[todayString] = 1
    }
    ctx.dbuser.pooped = pooped
    ctx.dbuser.markModified('pooped')
    await ctx.dbuser.save()
    return ctx.reply(
      `Количество каканий сегодня: ${ctx.dbuser.pooped[todayString]}.`
    )
  }
})

// Log
console.info('Bot is up and running')
