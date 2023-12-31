import { useEffect, useState } from "react";
import Dropdown from "./Components/Dropdown/Dropdown";
import "./styles.css";

export default function App() {

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [selectedValue, setSelectedValue] = useState('')

  /** Simulate dynamic dropdown values, coming from some API in real life */
  useEffect(() => {

    setLoading(true)

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setList(data.map(item => ({ name: item.name, value: item.name })))
      })
      .catch(err => {
        setLoading(false)
      })

    setLoading(false)
  }, [])

  return (
    <div className="App">
      <h1>Custom dropdown</h1>
      <Dropdown
        placeHolder="Select user"
        value={selectedValue}
        loading={loading}
        onChange={val => setSelectedValue(val.name)}
        options = {list}
      />
    </div>
  );
}
