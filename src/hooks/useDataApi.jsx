import { useState, useEffect } from 'react'

export const useFetch = (initialUrl) => {
  const [data, setData] = useState()
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {

    const fromStorage = localStorage.getItem(url)

    const getItem = async() => {
      if (fromStorage) {
        setData(JSON.parse(fromStorage))
      } else {
        setIsLoading(true)
        try {
          fetch(url)
            .then(res => res.json())
            .then(res => {
              setData([res])
              localStorage.setItem(url, JSON.stringify([res]))
            })
        } catch (err) {
          console.log('err', err)
        }
      }
      setIsLoading(false)
    }
    getItem()
    
  }, [url])

  return [{ data, isLoading }, setUrl]
}