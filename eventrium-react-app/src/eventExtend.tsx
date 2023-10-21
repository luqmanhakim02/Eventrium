import React from "react";

const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");

// Function to format a date from "dd-mm-yyyy" to "Month Day, Year"
function formatDate(inputDate: string): string {
  if (!inputDate) {
    return "No Date";
  }

  const [yyyy,mm,dd] = inputDate.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = parseInt(dd);
  const month = monthNames[parseInt(mm) - 1];
  const year = parseInt(yyyy);

  return `${month} ${day}, ${year}`;
}

const EventExtend: React.FC = () => {
  if (existingEvents.length === 0) {
    return null;
  }

  return (
    <div className="col-lg-6 col-md-6 col-sm-6">
      <div className="blog__item">
        <div className="blog__item__pic">
          <img src="img/featured/feature-2.jpg" alt="" />
        </div>
        <div className="blog__item__text">
          <ul>
            <li>
              <i className="fa fa-calendar-o"></i>{" "}
              {formatDate(existingEvents[0]?.eventDetails?.event_date)}
            </li>
            <li>
              <i className="fa fa-comment-o"></i> {existingEvents.length}
            </li>
          </ul>
          <h5>
            <a href={`join-event.html?eventID=${existingEvents[0]?.eventDetails?.eventID || 1}`}>
              {existingEvents[0]?.eventDetails?.event_name || "No Event Name"}
            </a>
          </h5>
          <p>
            {existingEvents[0]?.eventDetails?.description || "No Description"}
          </p>
          <a href={`join-event.html?eventID=${existingEvents[0]?.eventDetails?.eventID || 1}`} className="blog__btn">
            READ MORE <span className="arrow_right"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventExtend;
