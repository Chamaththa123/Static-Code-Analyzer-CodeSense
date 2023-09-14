import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function BarChart({
  singleLineCommentsCount,
  multiLineCommentsCount,
  ifElseCount,
  forLoopCount,
  whileLoopCount,
  returnStatementCount,stringCount,intCount,doubleCount,booleanCount,floatCount
}) {
  // Define colors for each bar
  const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(73, 255, 51 ,0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  // Sample data
  const data = {
    labels: ['S.L.C', 'M.L.C', 'If-Else', 'For', 'While', 'Return','String','Int','Double','boolean','Float'],
    datasets: [
      {
        label: 'Counted Value',
        data: [
          singleLineCommentsCount,
          multiLineCommentsCount,
          ifElseCount,
          forLoopCount,
          whileLoopCount,
          returnStatementCount,stringCount,intCount,doubleCount,booleanCount,floatCount
        ],
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('0.2', '1')),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '95%' }}> 
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
