import { FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'

interface Props {
  
}

export const RefreshTester: FunctionComponent<Props> = ({
  
}) => {
  const [background, setBg] = useState<string>('blue')

  useEffect(() => {
    let intervalId = setInterval(() => {
      setBg(bg => {
        if (bg == 'blue') return 'red'
        else if (bg == 'red') return 'purple'
        else return 'blue'
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div style={{width:50,height:50,background}}></div>
  )
}
