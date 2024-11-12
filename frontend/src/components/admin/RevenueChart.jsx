import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/order";
import { Chart } from "react-google-charts";

const options = {
    title: "Revenue Per Day",
    hAxis: { title: "Revenue", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Date", minValue: 0 },
    chartArea: { width: "70%", height: "70%" },
    bars: "vertical",
    colors: ["#1b9e77"],
  }
  

const RevenueChart =({chartData})=>{
   
    return(
        <>
         <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={chartData}
            options={options}
          />
        </>
    )
}

export default RevenueChart