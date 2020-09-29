import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar, Polar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths}, country }) => {
    const [dailyData, setDailyData ] = useState([]);

    useEffect(() => {
       const fetchAPI = async () => {
           setDailyData(await fetchDailyData());
       }
       fetchAPI();
    }, []);  

    const lineChart = (
        dailyData.length 
        ? (
            <Line
            data={{
                labels: dailyData.map(( { date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }]
            }}
         /> ) : null
    )
   
    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)' ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
                }}
                options={{
                    legend: {display: false},
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    );
    const polarChart = (
        confirmed
        ?(
            <Polar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)' ],
                        data: [confirmed.value, recovered.value, deaths.value, ],
                    },
                ],
                }}
                options={{
                    legend: {display: false},
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={8}>
                {country ? barChart : lineChart} 
                {polarChart}
            </Grid>
            </Grid>
        </div>
    )
}

export default Chart;