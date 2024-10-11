import {account, coin, type_info} from "@sentio/sdk/aptos/builtin/0x1";

import { stable_pool } from './types/aptos/m2-testnet/0x6b64dd329dc601da9bbd37447e363d06ad59262707c83c1529ab792001982b5b.js'
import { AptosNetwork } from "@sentio/sdk/aptos";

function getPoolName(prefix: string, types: string[]): string {
  return `${prefix}-${types.join('-')}`
}

stable_pool.bind()
  .onEventAddLiquidityEvent(async (event, ctx) => {
    ctx.eventLogger.emit('add_liquidity', {
      pool: getPoolName("stable", event.type_arguments),
      ...event.data_decoded
    })
  })
.onEventRemoveLiquidityEvent(async (event, ctx) => {
    ctx.eventLogger.emit('remove_liquidity', {
      pool: getPoolName("stable", event.type_arguments),
      ...event.data_decoded
    })
  })

account.bind({network: AptosNetwork.MOVEMENT_TEST_NET}).onEventCoinRegisterEvent(async (event, ctx) => {
  ctx.meter.Counter("coin_register").add(1)
})