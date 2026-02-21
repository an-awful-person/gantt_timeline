import { Card, CardContent, Typography } from '@mui/material'
import './App.css'
import { GanttComponent } from './components/Gantt.component'
import type { BarChartData } from './models/gantt.model'

function App() {

  const data: BarChartData = {
    labels:['1','2','3','4','5','6','7'],
    datasets: [{
      label: 'My First Dataset',
      data: [[20,65], [10,59], [50,80], [60,81], [100,56], [55,60], 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ]
    }]
  }

  return (
    <>
    <Typography variant='h3'>Gantt timeline</Typography>
    <Card sx={{width:'50em'}}>
      <CardContent>
      <GanttComponent data={data}/>
      </CardContent>
      </Card>
    </>
  )
}

export default App
