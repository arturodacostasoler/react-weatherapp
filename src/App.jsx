import { useState } from 'react'
import axios from 'axios'

//https://es.vite.dev/guide/env-and-mode
//https://home.openweathermap.org/api_keys
//https://home.openweathermap.org/users/sign_up
const API_KEY = import.meta.env.VITE_API_KEY

function App() {

  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0
  })

  const [currenData, setCurrentData] = useState({})

  async function handleLocationSearch(e) {
    e.preventDefault()

    //https://openweathermap.org/api/geocoding-api#reverse
    //&limit=1
    //&units=imperial
    let response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}`)
    //https://openweathermap.org/api/one-call-3#current
    //&units=imperial
    // let response = await axios.get(`http://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}`)


    setCurrentData(response)
  }

  function handleChange(e) {
    setCoordinates({ ...coordinates, [e.target.name]: Number(e.target.value) })
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-to-b from-blue-300 to-white">
      <div className="p-6 mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={handleLocationSearch} className="space-y-4">
          <input placeholder="Latitude"
            onChange={handleChange}
            name="latitude"
            type='number' step="0.01" min="-90" max="90"
            required
            className="w-full p-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input placeholder="Longitude"
            onChange={handleChange}
            name="longitude"
            type='number' step="0.01" min="-180" max="180"
            required
            className="w-full p-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit"
            className="w-full py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >Search</button>

        </form>
      </div>
      {JSON.stringify(currenData)}
    </div>
  )
}

export default App
