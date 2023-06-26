import { useEffect, useState } from "react"
import Loading from "./components/commons/Loading"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000)
  }, [])

  return (
    <>
      {loading === false ? (
        <>
          <h1>Petopia</h1>
        </>) : <Loading />
      }
    </>
  )

}

export default App
