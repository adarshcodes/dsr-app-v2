import React from 'react'
import { List } from './List'

const data = [
    {
        name: 'Adarsh',
        hours: '8',
        teamlead_name: 'anyone',
        date: '12-04-2023'
    },
    {
        name: 'Adarsh',
        hours: '8',
        teamlead_name: 'anyone',
        date: '12-04-2023'
    },
    {
        name: 'Adarsh',
        hours: '8',
        teamlead_name: 'anyone',
        date: '12-04-2023'
    },
    {
        name: 'Adarsh',
        hours: '8',
        teamlead_name: 'anyone',
        date: '12-04-2023'
    },
]

const Dashboard = () => {
  return (
    <div className="container">

    <div className='dash'>
        <div className='cards cards1'>
            <p>Total Employee:</p>
        </div>
         <div className='cards cards2'>
            <p>Today Total Dsr:</p>
        </div>
         <div className='cards cards3'>
            <p>Today Dsr:</p>
        </div>
    </div>

<List item={data}/>
<List item={data}/>
<List item={data}/>
