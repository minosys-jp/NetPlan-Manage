import YAML from "yaml"
//import fs from "fs"

export interface RouteType {
  to: string,
  via: string
}

export interface EthernetType {
  dhcp4?: boolean,
  dhcp6?: boolean,
  addresses?: string[],
  routes?: RouteType[],
  routes6?: RouteType[],
  nameservers?: string[]
}

export interface EthernetsType {
  [key: string]: EthernetType
}

export interface NetworkType {
  version: number,
  renderer: string,
  ethernets: EthernetsType
}

export interface NetworksType {
  network: NetworkType
}

async function handshake_get(url: string): Promise<string> {
  const response = await fetch(url)
  const text = await response.text()
  return text
}

async function handshake_post(url: string, data: string): Promise<void> {
  const headers = { "Content-Type": "text/plain" }
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: data
  })
  await response.text()
}

export async function get_ether_names(): Promise<string[]> {
  const r = await handshake_get("/api/dev")
  const json: string[] = JSON.parse(r)
  return json
/*
  const fname = "/proc/dev"
  const c = fs.readFileSync(fname)
  const ra: string[] = []
  if (c) {
    const sa = c.split("\n")
    return sa.map(s => s.split(":")[0].trim())
  }
  return ra
*/
}

export async function np_loader(): Promise<NetworksType> {
  const yaml_text = await handshake_get("/api/load")
  if (yaml_text) {
    return YAML.parse(yaml_text)
  } else {
    const ether_names = await get_ether_names()
    const ethers: EthernetsType = {}
    ether_names.map(e => ethers[e] = { dhcp4: true, dhcp6: false })
    return (
      {
        network: {
          version: 2,
          renderer: 'networkd',
          ethernets: ethers,
        },
      }
    )
  }
/*
  //const fname = "/etc/netplan/99-netplan.yml"
  const fname = "./99-netplan.yml"
  const c = fs.readFileSync(fname)
  if (c) {
    const c2 = c.replace('no', 'false').replace('yes', 'true')
    return YAML.parse(c2)
  }
  const ethers: EthernetsType = {}
  ether_names.map(e => ethers[e] = { dhcp4: true, dhcp6: false })
  return (
    {
      network: {
        version: 2,
        renderer: 'networkd',
        ethernets: ethers,
      },
    }
  )
*/
}

export function create_ether_information(
  dhcp4: boolean,
  dhcp6: boolean,
  addresses: string[],
  routes4: RouteType[],
  routes6: RouteType[],
  nameservers: string[]): EthernetType {
  const v: EthernetType = {dhcp4: true, dhcp6: false}
  if (dhcp4) {
    v['dhcp4'] = true
  } else {
    v['dhcp4'] = false
    if (routes4.length > 0) {
      v['routes'] = routes4
    }
  }
  if (dhcp6) {
    v['dhcp6'] = true
  } else {
    v['dhcp6'] = false
    if (routes6.length > 0) {
      v['routes6'] = routes6
    }
  }
  if ((!dhcp4 || !dhcp6) && addresses.length > 0) {
    // TODO: check v4, v6 addresses 
    v['addresses'] = (typeof(addresses) == 'string') ? [addresses] : addresses
  }
  if (nameservers.length > 0) {
    v['nameservers'] = (typeof(nameservers) == 'string') ? [nameservers] : nameservers
  }
  return v
}

export async function np_saver(json: NetworksType): Promise<void> {
  const yaml = YAML.stringify(json)
  console.log("yaml", yaml)
  await handshake_post("/api/save", yaml)
/*
  //const fname = "/etc/netplan/99-netplan.yml"
  const fname = "./99-netplan.yml"
  fs.writeFileSync(fname, YAML.stringify(json))
*/
}
