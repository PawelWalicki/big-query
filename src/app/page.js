"use client"
import { useEffect, useState } from "react";
import { CountrySelect } from "./components/CountrySelect";

const ITEMS_PER_PAGE = 50

export default function Home() {
  const [data, setData] = useState([])
  const [startIdx, setStartIdx] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [countryFilter, setCountryFilter] = useState([]) // ["PL", "FR"]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sales")
        if (!response.ok) {
          throw new Error("Failed to fetch")
        }
        const json = await response.json()
        setData(json.rows)
      }
      catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setStartIdx((currentPage - 1) * ITEMS_PER_PAGE)
  }, [currentPage])

  useEffect(()=>{
    console.log(countryFilter)
  },[countryFilter])

  let getCountriesFromData = () => {
    const countries = [...new Set(data.map(element => element.country))] // Check it! 
    return countries.map(country => ({
      value: country,
      label: country
    }))
  }

  // Wyciagnac options jako props w Country Select -> zrobic z tych DE,PL... {value:"PL", label:"PL"}
  return (
    <div className="p-3">
      <CountrySelect options={getCountriesFromData()} setCountryFilter={setCountryFilter} />
      <table className=" w-7xl border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left bg-gray-700">Order date</th>
            <th className="border border-gray-300 px-4 py-2 text-left bg-gray-700">Country</th>
            <th className="border border-gray-300 px-4 py-2 text-left bg-gray-700">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(startIdx, startIdx + ITEMS_PER_PAGE)
            .map((element, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 px-4 py-2">
                  {element.order_date.value}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {element.country}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {element.revenue}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {Array.from({ length: data.length / ITEMS_PER_PAGE }, (_, index) => (
        <button className="m-[5] cursor-pointer hover:text-stone-400" key={index} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
      ))}


    </div>
  );
}

// [Front] [REST API]{ "order_date": { "value": "2026-07-14" }, "country": "PL", "revenue": 193 }
