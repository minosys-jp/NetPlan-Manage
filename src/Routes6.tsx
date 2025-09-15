import React, { useState } from "react"
import type { RouteType } from "./Lib"

export default function Routes6({ ename, oldRoutes }: { ename: string, oldRoutes: RouteType[] | undefined}) {
  const old: RouteType[] = oldRoutes ? oldRoutes : []
  const [routes, setRoutes] = useState(old)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, i: number, k: string): RouteType[] {
    const newRoutes = [...routes]
    if (k === "to" || k === "via") {
      if (i < newRoutes.length) {
        newRoutes[i][k] = e.target.value
      } else {
        const obj: RouteType = { to: "", via: "" }
        if (k === "to" || k === "via") {
          obj[k] = e.target.value
          newRoutes.push(obj)
        }
      }
    }
    return newRoutes
  }

  return (
    <table>
      {routes.filter(a => a).map((a, i) => (<tr key={i}><td>To</td><td><input type="text" name={ename + "-routes6-to" } value={a["to"]} onChange={e => setRoutes(handleChange(e, i, "to"))}/></td><td>Via</td><td><input type="text" name={ename + "-routes6-via"} value={a["via"]} onChange={e => setRoutes(handleChange(e, i, "via"))} /></td></tr>))}
      <tr key={routes.length}><td>To</td><td><input type="text" name={ename + "-routes6-to"} value="" onChange={e => setRoutes(handleChange(e, routes.length, "to"))} /></td><td>Via</td><td><input type="text" name={ename + "-routes6-via"} value="" onChange={e => setRoutes(handleChange(e, routes.length, "via"))} /></td></tr>
    </table>
  )
}
