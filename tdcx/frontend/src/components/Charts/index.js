import { Pie } from "react-chartjs-2";
import React, { useState } from "react";
import {Chart, ArcElement, ArcProps} from 'chart.js'
Chart.register(ArcElement);

// interface DatasetType {
//   data: number[];
//   backgroundColor: string[];
// }

function TaskListCompletion(props) {
  const {count , taskList} =props;
  const labels = ["completed", "remaining"],
        datasets = [
          {
            data: [count, (taskList.length)-count],
            backgroundColor: ["#5285EC","#E8ECEC"]
          }
        ]
  return (
    <Pie
      options={{
        width: "240px",
        height: "130px",
      }}
      data={{
        labels: labels,
        datasets: datasets
      }}
    />
  );
}

export default TaskListCompletion;
