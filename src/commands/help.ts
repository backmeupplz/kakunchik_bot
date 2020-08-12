// Dependencies
import { Telegraf, Context } from 'telegraf'

export function setupHelp(bot: Telegraf<Context>) {
  bot.command(['help', 'start'], (ctx) => {
    ctx.replyWithHTML(
      'Пришлите мне стикер какунчика, и я запишу, сколько раз вы какали сегодня.'
    )
  })
}
