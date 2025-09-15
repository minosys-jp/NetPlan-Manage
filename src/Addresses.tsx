import React, { useState } from "react"

export default function Addresses({ ename, oldAddresses }: { ename: string, oldAddresses: string[] | undefined}) {
  const old: string[] = oldAddresses ? oldAddresses : []
  const [addresses, setAddresses] = useState(old)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, i: number): string[] {
    const newAddrs = [...addresses]
    if (i < newAddrs.length) {
      newAddrs[i] = e.target.value
    } else {
      newAddrs.push(e.target.value)
    }
    return newAddrs;
  }

  return (
    <table>
      {addresses.filter(a => a).map((a, i) => (<tr key={i}><td><input type="text" name={ename + "-addresses"} value={a} onChange={e => setAddresses(handleChange(e, i))} /></td></tr>))}
      <tr key={addresses.length}><td><input type="text" name={ename + "-addresses"} value="" onChange={e => setAddresses(handleChange(e, addresses.length))} /></td></tr>
    </table>
  )
}
