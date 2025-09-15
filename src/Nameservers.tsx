import React, { useState } from "react"

export default function Nameservers({ ename, oldNameservers }: { ename: string, oldNameservers: string[] | undefined}) {
  const old: string[] = oldNameservers ? oldNameservers : [];
  const [nameservers, setNameservers] = useState(old)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, i: number): string[] {
    const newItems = [...nameservers]
    if (i < newItems.length) {
      newItems[i] = e.target.value
    } else {
      newItems.push(e.target.value)
    }
    return newItems
  }

  return (
    <table>
      {nameservers.filter(a => a).map((a, i) => (<tr key={i}><td><input type="text" name={ename + "-nameservers"} value={a} onChange={e => setNameservers(handleChange(e, i))} /></td></tr>))}
      <tr key={nameservers.length}><td><input type="text" name={ename + "-nameservers"} value="" onChange={e => setNameservers(handleChange(e, nameservers.length))} /></td></tr>
    </table>
  )
}
