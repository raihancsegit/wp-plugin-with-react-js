import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardWidget = () => {
  const [Apidata, setApiData] = useState();

  const url = `${appLocalizer.apiUrl}/wprk/v1/settings`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setApiData(res.data);
      console.log(res.data);
    });
  }, []);

  const changeFilter = (eve) => {
    console.log(eve.target.value);
  };
  const data = Apidata;

  return (
    <div>
      <h2 style={{ display: "inline" }}>Graph Widget</h2>
      <div style={{ float: "right" }}>
        <select onChange={changeFilter}>
          <option value="7">Last 7 Days</option>
          <option value="15">Last 15 Days</option>
          <option value="1">Last 1 Month</option>
        </select>
      </div>

      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default DashboardWidget;
