import Addresses from "./Addresses"
import Routes from "./Routes"
import Routes6 from "./Routes6"
import Nameservers from "./Nameservers"
import { useState } from "react"
import type { EthernetType } from "./Lib"

export default function Ether({ ename, ether }: { ename: string, ether: EthernetType | undefined}) {
  const [ dhcp4, setDhcp4 ] = useState(ether ? ether["dhcp4"] : true)
  const [ dhcp6, setDhcp6 ] = useState(ether ? ether["dhcp6"] : false)
  if (ether === undefined) {
    return (<div></div>)
  }
  console.log("DHCP4", ether["dhcp4"])
  console.log("DHCP6", ether["dhcp6"])

  return (
    <table className="border-spacing-2 border-2 border-red-500">
      <tr><th>DHCPv4</th><td>
      <input type="radio" name={ename + "-dhcp4"} value="true" checked={dhcp4 == true} onChange={() => setDhcp4(true)} />Yes
      <input type="radio" name={ename + "-dhcp4"} value="false" checked={dhcp4 == false} onChange={() => setDhcp4(false)} />No
      </td></tr>
      <tr><th>DHCPv6</th><td>
      <input type="radio" name={ename + "-dhcp6"} value="true" checked={dhcp6 == true} onChange={() => setDhcp6(true)} />Yes
      <input type="radio" name={ename + "-dhcp6"} value="false" checked={dhcp6 == false} onChange={() => setDhcp6(false)} />No
      </td></tr>
      <tr><th>Addresses</th><td>
      {(!dhcp4 || !dhcp6) ? (<Addresses ename={ename} oldAddresses={ether["addresses"]} />) : "" }
      </td></tr>
      <tr><th>Routes4</th><td>
      {!dhcp4 ? (<Routes ename={ename} oldRoutes={ether["routes"]} />) : "" }
      </td></tr>
      <tr><th>Routes6</th><td>
      {!dhcp6 ? (<Routes6 ename={ename} oldRoutes={ether["routes6"]} />) : "" }
      </td></tr>
      <tr><td>
      </td></tr>
      <tr><th>Nameservers</th><td>
      <Nameservers ename={ename} oldNameservers={ether['nameservers']} />
      </td></tr>
    </table>
  )
}
