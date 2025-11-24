import React, { useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'twin.macro';
const twColor = theme`colors`;
const COLOR_3 = twColor.emerald['300'];
const COLOR_2 = twColor.blue['500'];
const COLOR_4 = twColor.amber['500'];
const COLOR_5 = twColor.red['500'];

export default function AphexChart({ data, name }) {
  let names = [];
  let quantities = [];
  data.forEach(function (n) {
    names.push(n.name);
    quantities.push(n.quantity);
  });

  return React.createElement(Chart, {
    type: 'donut',
    series: quantities,

    labels: {
      show: false,
      name: {
        show: false,
      },
    },
    options: {
      dataLabels: {
        enabled: false, // Already hides data labels
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: name != 'DealMaster',
              total: {
                showAlways: name != 'DealMaster',
                show: name != 'DealMaster',
              },
            },
          },
        },
      },
      labels: names,
      legend: {
        show: false,
        position: 'bottom',
      },
      colors: [COLOR_3, COLOR_2, COLOR_4, COLOR_5],
    },
  });
}
