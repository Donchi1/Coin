import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'

function Chart() {
  const data = [200, 400, 100, 500, 900, 80, 500, 400, 300, 700, 600, 300]

  const largest = data.sort((a, b) => a - b)
  const st = largest[11]
  const nd = largest[10]
  const td = largest[9]

  return (
    <Row>
      <Col style={{ minWidth: '45%' }} sm={12} lg={6}>
        <Card className="site-bg2  pt-1 mt-3">
          <Bar
            redraw={true}
            className="shadow-lg"
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: false,
              scales: {
                gridLines: {
                  display: false,
                },
              },
            }}
            data={{
              labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'June',
                'July',
                'Aug',
                'sep',
                'Oct',
                ' Nov',
                'Dec',
              ],

              datasets: [
                {
                  data,
                  fill: true,
                  label: 'Monthly Income',
                  borderColor: '#3333ff',
                  backgroundColor: Array.from({ length: 12 }).map((e, _) => {
                    return '#ccc'
                  }),
                },
              ],
            }}
          />
          <Card.Footer>
            <Card.Subtitle>Monthly Income Data</Card.Subtitle>
          </Card.Footer>
        </Card>
      </Col>
      <Col style={{ minWidth: '45%' }} sm={12} lg={6}>
        <Card className="site-bg2 pt-1 mt-3">
          <Doughnut
            redraw={true}
            options={{
              legend: false,
              title: 'Income Analysis',
              scales: { scaleLabel: true },
            }}
            data={{
              labels: ['Highest', 'Miduim', 'Small'],
              datasets: [
                {
                  data: [st, nd, td],
                  fill: true,
                  label: 'Incomes',
                  backgroundColor: ['green', 'blue', 'red'],
                },
              ],
            }}
          />
          <Card.Footer>
            <Card.Subtitle>Income Information</Card.Subtitle>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  )
}

export default Chart

export const LnChart = ({ data, color }) => {
  return (
    <Sparklines data={data} height={40}>
      <SparklinesLine color={color} />
      <SparklinesSpots style={{ fill: color }} />
    </Sparklines>
  )
}
export const BarChart = ({ data }) => {
  return (
    <Bar
      className="shadow-lg"
      height={350}
      options={{
        legend: false,
        maintainAspectRatio: false,
        scales: {
          gridLines: {
            display: false,
          },
        },
      }}
      data={{
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'sep',
          'Oct',
          ' Nov',
          'Dec',
        ],

        datasets: [
          {
            data: [data || 5, 6, 8, 9, 6, 4, 5, 10, 20, 11, 9, 23],
            fill: true,
            label: 'Monthly Income',
            borderColor: '#3333ff',

            backgroundColor: Array.from({ length: 12 }).map((e, _) => {
              return '#ccc'
            }),
          },
        ],
      }}
    />
  )
}
export const DoughnutChart = ({ data }) => {
  const largest = data.sort((a, b) => a - b)
  const st = largest[11]
  const nd = largest[10]
  const td = largest[9]
  return (
    <Doughnut
      redraw={true}
      options={{
        legend: false,
        title: 'Income Analysis',
        scales: { scaleLabel: true },
      }}
      data={{
        labels: ['Highest', 'Miduim', 'Small'],
        datasets: [
          {
            data: [st, nd, td],
            fill: true,
            label: 'Incomes',
            backgroundColor: ['green', 'blue', 'red'],
          },
        ],
      }}
    />
  )
}
