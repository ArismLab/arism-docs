import functionPlot from 'function-plot/dist/function-plot'
import React, { useEffect, useRef } from 'react'


export const Plot = React.memo(({ options }: any) => {
  const rootEl = useRef(null)

  useEffect(() => {
    try {
      functionPlot(Object.assign({}, options, { target: rootEl.current }))
    } catch (e) {}
  })

  return (<div ref={rootEl} />)
}, () => false)