import React, { useState, useEffect } from "react";
import { useGetActivitiesQuery } from "./app/api";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"

import  {Doughnut} from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
export default function ActivityStats() {
    const [activities, setActivities] = useState([]);
    const { data: activityData } = useGetActivitiesQuery();

    useEffect(() => {
        if (activityData) {
            setActivities(activityData.activities);
        }
    }, [activityData]);

    const categoryCount=(activities) => {
        let count = [0,0,0];
        for (let activity of activities) {
            if (activity['category'] === "business"){
                count[0]+=1
            }else if (activity['category'] === "personal"){
                count[1]+=1
            }else if (activity['category'] === "leisure"){
                count[2]+=1
            }
        }
        return count
    }


    const chartData = {
        labels: ["business", "personal", "leisure"],
        datasets: [
            {
                label: "Activity Categories",
                data: categoryCount(activities),
                backgroundColor: ["#00a9b4", "#be003e", "#e08814"],
                borderColor: "#ffffff",
            },
        ],
    };

    const options = {
        cutout:"65%"
    }

    return (
        <div style={ {width: "350px"}}>
            <Doughnut
                data={chartData}
                options={options}
            />
        </div>
    );
}
