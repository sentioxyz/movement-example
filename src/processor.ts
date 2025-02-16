import { account } from "@sentio/sdk/aptos/builtin/0x1";
import { MovementNetwork } from "@sentio/sdk/aptos";

import { tradeport_launchpad } from "./types/aptos/movement-testnet/0xe4f1797a3c7f465842231e621ae7156d899e3f75c227257acf42ea12e385b30a.js";


tradeport_launchpad.bind({network: MovementNetwork.TEST_NET}).onEventMintNftEvent(async (event, ctx) => {
  ctx.eventLogger.emit("mint", {
    address: event.data_decoded.address,
    owner: event.data_decoded.owner,
    price: event.data_decoded.price,
  })
})

account.bind({network: MovementNetwork.TEST_NET}).onEventCoinRegisterEvent(async (event, ctx) => {
  ctx.meter.Counter("coin_register").add(1)
})