import React, {useState, useEffect} from 'react'
import ListList from './ListList'
import axios from '../../config/axios'

function ListHome() {
    const [list, setList] = useState([])

    const fetchList = async () => {
        try{
            const res = await axios.get('/lists')
            setList(res.data.movie)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        fetchList()
    }, [])

  return (
    <>
      <ListList list={list}  />
    </>
  )
}

export default ListHome