import clipboard from "./Images/Clipboard.png";
import calendar from "./Images/Calendar.png";
import personal from "./Images/Personal.png";
import leisure from "./Images/Leisure.png";
import business from "./Images/Business.png";
import { useGetActivitiesQuery } from "./app/api";
import React, { useState, useEffect } from "react";
import "./statsPage.css"

export default function StatsPage() {
    const [activities, setActivities] = useState([]);
    const { data: activityData } = useGetActivitiesQuery();

    useEffect(() => {
        if (activityData) {
            setActivities(activityData.activities);
        }
    }, [activityData]);

    const categoryCount = (activities) => {
        let count = [0, 0, 0];
        for (let activity of activities) {
            if (activity["category"] === "business") {
                count[0] += 1;
            } else if (activity["category"] === "personal") {
                count[1] += 1;
            } else if (activity["category"] === "leisure") {
                count[2] += 1;
            }
        }
        return count;
    };

    const numEvents = (activities) => {
        let countEvents = 0;
        for (let activity of activities) {
            if (activity.is_event === true) {
                countEvents += 1;
            }
        }
        return countEvents;
    };

    const numTasks = (activities) => {
        let countTasks = 0;
        for (let activity of activities) {
            if (activity.is_event === false) {
                countTasks += 1;
            }
        }
        return countTasks;
    };

    return (
        <div className="card">
            <div
                className="front"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,33.33%)",
                    justifyItems: "center",
                    alignItems: "center",
                    margin: "50px 50px 50px 50px",
                }}
            >
                <div style={{ margin: "45px 45px 45px 45px" }}>
                    <img
                        src={business}
                        alt="Business Icon"
                        style={{
                            height: "130px",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    />
                    <h3 style={{ textAlign: "center" }}>
                        {categoryCount(activities)[0]} Business Activities
                    </h3>
                </div>
                <div style={{ margin: "45px 45px 45px 45px" }}>
                    <img
                        src={personal}
                        alt="Personal Icon"
                        style={{
                            height: "130px",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    />
                    <h3 style={{ textAlign: "center" }}>
                        {categoryCount(activities)[1]} Personal Activities
                    </h3>
                </div>
                <div style={{ margin: "45px 45px 45px 45px" }}>
                    <img
                        src={leisure}
                        alt="Leisure Icon"
                        style={{
                            height: "130px",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    />
                    <h3 style={{ textAlign: "center" }}>
                        {categoryCount(activities)[2]} Leisure Activities
                    </h3>
                </div>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,50%)",
                    justifyItems: "center",
                    alignItems: "center",
                }}
                className="front"
            >
                <div style={{ margin: "100px 100px 100px 100px" }}>
                    <img
                        src={calendar}
                        alt="Calendar Icon"
                        style={{ height: "165px" }}
                    />
                    <h3 style={{ textAlign: "center" }}>
                        {numEvents(activities)} Events
                    </h3>
                </div>
                <div style={{ margin: "100px 100px 100px 100px" }}>
                    <img
                        src={clipboard}
                        alt="Clipboard Icon"
                        style={{ height: "185px" }}
                    />
                    <h3 style={{ textAlign: "center" }}>
                        {numTasks(activities)} Tasks
                    </h3>
                </div>
            </div>
        </div>
    );
}
