import moment from "moment";

export function toTimeString(milliSeconds) {
  const portions = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(milliSeconds / msInHour);
  portions.push(formatNum(hours));
  milliSeconds = milliSeconds - hours * msInHour;

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(milliSeconds / msInMinute);
  portions.push(formatNum(minutes));
  milliSeconds = milliSeconds - minutes * msInMinute;

  const seconds = Math.trunc(milliSeconds / 1000);
  portions.push(formatNum(seconds));

  return portions.join(":");
}

export function formatNum(num) {
  if (num < 10) {
    return "0" + num.toString();
  } else {
    return num.toString();
  }
}

export function toDateString(dateTimeString) {
  const date = Date.parse(dateTimeString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateString = new Date(date).toLocaleDateString("en-US", options);
  const timeOptions = { hour: "numeric", minute: "numeric" };
  const time = new Date(date).toLocaleTimeString("en-US", timeOptions);
  return `${dateString}, ${time}`;
}

export function toWordedTime(duration) {
  const portions = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + " hr");
    duration = duration - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + " min");
    duration = duration - minutes * msInMinute;
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + " sec");
  }

  return portions.join(" ");
}

export function toRelativeTime(previous) {
  const current = new Date().getTime();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const elapsed = current - new Date(previous).getTime();

  if (elapsed < msPerDay) {
    if (moment(previous).day() === moment(current).day()) {
      return moment(previous).fromNow();
    } else {
      return moment(previous).calendar();
    }
  } else if (moment(previous).add(1, "day").day() === moment(current).day()) {
    return moment(previous).calendar();
  } else if (moment(current).diff(moment(previous), "days") < 7) {
    return moment(previous).format("ddd [at] hh:mm A");
  } else {
    return moment(previous).format("MMM DD [at] hh:mm A");
  }
}

export function toTitleCase(str) {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}


 // Function to highlight matching text
export const highlightText = (text, highlight) => {
  if (!highlight.trim()) return text;
  
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span className="inline-block">
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} style={{ color: '#EA6936' }}>{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};