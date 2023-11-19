import { useState, useEffect } from 'react'
import axiosConfig from '../api/axiosConfig'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const Charts = () => {
  const [data, setData] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const startYear = 2023;
  const endYear = 2030;
  const years = Array(endYear - startYear + 1).fill().map((_, idx) => startYear + idx);

  useEffect(() => {
    axiosConfig.get('/movements')
      .then(response => {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [selectedYear])

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  function getMonthName(date) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${monthName} ${year}`;
  }

  const dataByMonth = data.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthName = getMonthName(date);

    if (!acc[monthName]) {
      acc[monthName] = { Ingresos: 0, Egresos: 0 };
    }

    if (item.typeAmount === 'Ingreso') {
      acc[monthName].Ingresos += item.amount;
    } else if (item.typeAmount === 'Egreso') {
      acc[monthName].Egresos += item.amount;
    }

    return acc;
  }, {});


  const chartData = Object.keys(dataByMonth).map(monthName => ({
    name: monthName,
    ...dataByMonth[monthName]
  }));

  const filteredData = chartData.filter(item => {
    const year = Number(item.name.split(' ')[1]);
    return year === Number(selectedYear);
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year) =>
          <option key={year} value={year}>{year}</option>
        )}
      </select>

      <BarChart
        width={1500}
        height={600}
        data={filteredData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Ingresos" fill="#82ca9d" />
        <Bar dataKey="Egresos" fill="#8884d8" />
      </BarChart>
    </div>
  )
}