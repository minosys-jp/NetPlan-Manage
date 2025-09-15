import Ether from "./Ether"
import type { EthernetsType } from "./Lib"

export default function Ethernets({ ethernets } : { ethernets: EthernetsType | undefined }) {
  if (ethernets === undefined) {
    return (<div></div>)
  }
  return Object.keys(ethernets).map((key, i) => {
    const value = ethernets[key]
    return (
      <table key={i} className="border-spacing-2 border-2 border-emerald-500">
        <tr><th>{key}</th><td>
        <Ether ename={key} ether={value} />
        </td></tr>
      </table>
    )
  })
}
