import { np_saver, create_ether_information, get_ether_names } from "./Lib"
import type { EthernetsType, NetworksType, RouteType } from "./Lib"

async function form_action_async(f: FormData): Promise<void> {
  const et: EthernetsType = {}
  const ethers = await get_ether_names()

  ethers.map(e => {
    const dhcp4_s = f.get(e + "-dhcp4")
    const dhcp6_s = f.get(e + "-dhcp6")
    const dhcp4 = (dhcp4_s && dhcp4_s.toString() === "true") ? true : false
    const dhcp6 = (dhcp6_s && dhcp6_s.toString() === "true") ? true : false
    const addresses = f.getAll(e + "-addresses").filter(a => a).map(a => a.toString())
    const routes4_to = f.getAll(e + "-routes-to").map(r => r.toString())
    const routes4_via = f.getAll(e + "-routes-via").map(r => r.toString())
    const routes4: RouteType[] = []
    for (let i = 0; i < routes4_to.length; i++) {
      if ((routes4_to[i] !== "") && (routes4_via[i] !== ""))
        routes4.push({ to: routes4_to[i], via: routes4_via[i] })
    }
    const routes6_to = f.getAll(e + "-routes6-to").map(r => r.toString())
    const routes6_via = f.getAll(e + "-routes6-via").map(r => r.toString())
    const routes6: RouteType[] = []
    for (let i = 0; i < routes6_to.length; i++) {
      if ((routes6_to[i] !== "") && (routes6_via[i] !== ""))
        routes6.push({ to: routes6_to[i], via: routes6_via[i] })
    }
    const nameservers = f.getAll(e + "-nameservers").filter(n => n).map(n => n.toString())
    et[e] = create_ether_information(dhcp4, dhcp6, addresses, routes4, routes6, nameservers)
  })
  const r: NetworksType = { network: { version: 2, renderer: "networkd", ethernets: et } }
  await np_saver(r)
}

export default function form_action(f: FormData): void {
  form_action_async(f)
  .then( () => { window.location.href = "/" } )
}
