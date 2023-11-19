import { useState, useEffect } from 'react'
import axiosConfig from '../api/axiosConfig'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const BarChartMonthCategory = () => {
  const [data, setData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(getMonthName(new Date()).split(' ')[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    axiosConfig.get('/movements')
      .then(response => {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [selectedMonth, selectedYear])

  function getMonthName(date) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${monthName} ${year}`;
  }

  const dataByCategory = data.reduce((acc, item) => {
    const category = item.category;
    const monthYear = getMonthName(new Date(item.date));

    if (!acc[category]) {
      acc[category] = {};
    }

    if (!acc[category][monthYear]) {
      acc[category][monthYear] = { Ingresos: 0, Egresos: 0 };
    }

    if (item.typeAmount === 'Ingreso') {
      acc[category][monthYear].Ingresos += item.amount;
    } else if (item.typeAmount === 'Egreso') {
      acc[category][monthYear].Egresos += item.amount;
    }

    return acc;
  }, {});

  const filteredData = data.filter(item => {
    const date = new Date(item.date);
    const month = getMonthName(date).split(' ')[0];
    const year = date.getFullYear().toString();
    return month === selectedMonth && year === selectedYear;
  });

  const categoryData = {};
  filteredData.forEach(item => {
    const monthData = dataByCategory[item.category][getMonthName(new Date(item.date))];
    if (!categoryData[item.category]) {
      categoryData[item.category] = { ...monthData };
    } else {
      categoryData[item.category].Ingresos += monthData.Ingresos;
      categoryData[item.category].Egresos += monthData.Egresos;
    }
  });
  const chartData = Object.keys(categoryData).map(category => ({ category, ...categoryData[category] }));

  return (
    <>
      <h1 className='text-left text-lg font-semibold self-start container py-8'>Ingresos y Egresos por mes y categoria</h1>
      <div className='flex justify-center items-center'>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          <option value="Enero">Enero</option>
          <option value="Febrero">Febrero</option>
          <option value="Marzo">Marzo</option>
          <option value="Abril">Abril</option>
          <option value="Mayo">Mayo</option>
          <option value="Junio">Junio</option>
          <option value="Julio">Julio</option>
          <option value="Agosto">Agosto</option>
          <option value="Septiembre">Septiembre</option>
          <option value="Octubre">Octubre</option>
          <option value="Noviembre">Noviembre</option>
          <option value="Diciembre">Diciembre</option>
        </select>
        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </div>
      <div className='flex justify-center items-center'>
        <BarChart width={1500} height={600} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Ingresos" fill="#82ca9d" />
          <Bar dataKey="Egresos" fill="#8884d8" />
        </BarChart>
      </div >
    </>
  )
}
