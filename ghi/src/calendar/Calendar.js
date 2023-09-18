import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import {
  useGetActivitiesQuery,
  useCreateActivityMutation,
  useDeleteActivityMutation,
} from "../app/api";
import ActivityFormModal from "../Activities/ActivityFormModal";
import "./calendar.css";

const styles = {
  wrap: {
    display: "flex",
    marginTop: "20px",
  },
  left: {
    marginRight: "10px",
    marginLeft: "10px",
  },
  main: {
    flexGrow: "1",
    marginRight: "10px",
  },
};
const Calendar = () => {
  const calendarRef = useRef();
  const [createActivity] = useCreateActivityMutation();
  const [deleteActivity] = useDeleteActivityMutation();
  const navigate = useNavigate();

  const [calendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: true,
    timeRangeSelectedHandling: "enabled",
    onTimeRangeSelected: async (args) => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create Event");
      dp.clearSelection();
      if (!modal.result) {
        return;
      }
      const id = DayPilot.guid();
      dp.events.add({
        start: args.start,
        end: args.end,
        id: id,
        text: modal.result,
      });
      const data = {
        start_date: args.start,
        end_date: args.end,
        id: id,
        title: modal.result,
        priority: "",
        category: "",
        description: "",
        location: "",
      };
      createActivity(data);
    },
    eventDeleteHandling: "",
    onEventDelete: async (args) => {
      deleteActivity(args.e.data.id);
    },
    onEventClick: async (args) => {
      navigate(`/activityupdate/${args.e.data.id}`);
    },
  });

  const [activities, setActivities] = useState([]);
  const { data: activityData } = useGetActivitiesQuery();

  useEffect(() => {
    if (activityData) {
      setActivities(activityData.activities);
    }
  }, [activityData]);
  const filtered_tasks = activities.filter((activity) => !activity.is_event);
  useEffect(() => {
    const filtered_activities = activities.filter(
      (activity) => activity.is_event
    );
    const events = filtered_activities.map((activity) => ({
      id: activity.id,
      text: activity.title,
      start: activity.start_date,
      end: activity.end_date,
      backColor: activity.color,
    }));
    const startDate = new Date();
    calendarRef.current.control.update({ startDate, events });
  }, [activities, filtered_tasks]);

  return (
    <div>
      <div style={styles.wrap}>
        <div style={styles.left}>
          <div className="mb-3">
            <ActivityFormModal />
          </div>
          <div>
            <DayPilotNavigator
              selectMode="Week"
              showMonths={1}
              skipMonths={1}
              startDate={new Date()}
              onTimeRangeSelected={(args) => {
                calendarRef.current.control.update({
                  startDate: args.day,
                });
              }}
            />
          </div>
          <p className="mt-4">
            <strong>Tasks</strong>
          </p>
          <div className="accordion mt-2" id="Accordion">
            {filtered_tasks.map((task) => (
              <div className="accordion-item" key={task.id}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${task.id}`}
                    aria-expanded="true"
                    aria-controls={`collapse${task.id}`}
                  >
                    {task.title}
                  </button>
                </h2>
                <div
                  id={`collapse${task.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${task.id}`}
                  data-bs-parent="Accordion"
                >
                  <div className="accordion-body">
                    <strong>Description:</strong> <br />
                    {task.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.main}>
          <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
