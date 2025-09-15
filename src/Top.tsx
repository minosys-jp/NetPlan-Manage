import { np_loader } from "./Lib"
import type { NetworksType } from "./Lib"
import Ethernets from "./Ethernets"
import form_action from "./FormAction"
import { useState, useEffect } from "react"

function Top() {
  const [np, setNp] = useState<NetworksType>()

  useEffect(() => {
    let mounted = true;
    (async () => {
      const npd = await np_loader()
      console.log("no_loader", npd)
      if (mounted) setNp(npd)
    })()
    return () => { mounted = false }
  }, [])

  if (!np) {
    return (
    <div>
      <h1>Current Netplan Settings</h1>
      <div>
        Now Loading...
      </div>
    </div>
    )
  }

  return (
  <div>
      <h1 className="text-black-600 text-3xl font-bold">Current Netplan Settings</h1>
      <div>
        <form action={form_action} >
          <table className="border-spacing-2 border-2 border-black-500">
            <tr><th className="border-spacing-2 border border-black-500" >version</th><td className="border-spacing-2 border border-black-500">{np['network']['version']}</td></tr>
            <tr><th className="border-spacing-2 border border-black-500">renderer</th><td className="border-spacing-2 border border-black-500">{np['network']['renderer']}</td></tr>
            <tr><th className="border-spacing-2 border border-black-500">Ethernets</th><td className="border-spacing-2 border border-black-500">
            <Ethernets ethernets={np['network']['ethernets']} />
            </td></tr>
          </table>
          <button name="submit" className="pl-8 pr-8 rounded-full text-white bg-red-700 hover:bg-red-500 ">Submit</button>
        </form>
      </div>
  </div>
  )
}

export default Top
