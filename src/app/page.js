import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/sales")
        if (!response.ok) {
          throw new Error("Failed to fetch")
        }
        const json = await response.json(
          setData(json)
        )
      }
      catch (e) {
        throw new Error(e)
      }
    }
  }, [])
  return (
    <div className="">

    </div>
  );
}
