"use client"
import { useEffect, useState } from "react";
import { CountrySelect } from "./components/CountrySelect";
import { RevenueSelect } from "./components/RevenueSelect";

const ITEMS_PER_PAGE = 50

export default function Home() {
  const [data, setData] = useState([])
  const [startIdx, setStartIdx] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [countryFilter, setCountryFilter] = useState([])
  // jak strukturyzowac filtry, a kontretnie from-to? 
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

  useEffect(() => {
    setCurrentPage(1)
  }, [countryFilter])

  let getCountriesFromData = () => {
    const countries = [...new Set(data.map(element => element.country))] 
    return countries.map(country => ({
      value: country,
      label: country
    }))
  }
  const filterData = countryFilter.length === 0 ? data : data.filter((element) => countryFilter.includes(element.country));

  return (
    <div className="p-3">
      <CountrySelect options={getCountriesFromData()} setCountryFilter={setCountryFilter} />
      <RevenueSelect></RevenueSelect>
      <table className=" w-7xl border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left bg-gray-700">Order date</th>
            <th className="border border-gray-300 px-4 py-2 text-left bg-gray-700">Country</th>
            <th className="border border-gray-300 px-4 py-2 text-left bg-gray-700">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filterData
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

      {Array.from(
        { length: Math.ceil(filterData.length / ITEMS_PER_PAGE) },
        (_, index) => (
          <button
            className={`m-[5px] cursor-pointer hover:text-stone-400 ${currentPage===index+1 ? "underline decoration-sky-500" : "" }`}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        )
      )}

    </div>
  );
}
