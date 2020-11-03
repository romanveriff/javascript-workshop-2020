// little helper functions
//

// debug to console
const debug = (...args) => console.info(...args, '\n');

// pluralize
const pluralize = (singular, plural, x) => {
  switch (x) {
    case 0:
      return `no ${plural}`;
    case 1:
      return `${x} ${singular}`;
    default:
      return `${x} ${plural}`;
  }
};

const summary = ({ messages, users }) =>
  `[${pluralize("message", "messages", messages.length)}, ${pluralize(
    "user",
    "users",
    users.length,
  )}]`;

// formats timestamps as HH:MM:SS
const formatTime = time =>
  new Date(time).toLocaleTimeString("en-UK", {
    timeZone: "Europe/Tallinn",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

// compose functions
const pipe = (...fns) => (...args) =>
  fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

// generate timestamps for initial model and events
const rndTime = offset => Date.now() + offset * 1000;
const t8 = rndTime(8);
const t12 = rndTime(12);

// view renders model
//
const view = ({ users, messages }) =>
  console.log(
    "view",
    summary({ users, messages }),
    messages.map(
      m =>
        `${m.isDeleted ? "X " : "  "}${formatTime(m.time)} ${m.user}: ${
          m.text
        }`,
    ),
  );

// update generates a new model based on event and current model
//
const update = e => model => {
  debug("update", summary(model), e);
  switch (e.action) {
    case "ADD_MESSAGE":
      // adds the message to the end of messages
      return { ...model, messages: [...model.messages, e.payload] };

    case "DELETE_MESSAGE":
      // marks the message as deleted
      return {
        ...model,
        messages: model.messages.map(m =>
          m.time === e.payload.time ? { ...m, isDeleted: true } : m,
        ),
      };

    default:
      // otherwise returns the current model
      return model;
  }
};

// collection of events
//
const events = [
  {
    action: "ADD_MESSAGE",
    payload: { time: rndTime(1), user: "roman", text: "hello" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: rndTime(2), user: "liisbet", text: "hi, darling" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: rndTime(5), user: "roman", text: "want to learn js?" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: t8, user: "liisbet", text: "when?" },
  },
  {
    action: "DELETE_MESSAGE",
    payload: { time: t8 },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: t12, user: "liisbet", text: "when do we start?" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: t12, user: "roman", text: "today" },
  },
];

// the app is a composition of all updates and view function
//
const app = pipe(
  ...events.map(update),
  view,
);

// initial model
//
const init = { users: ["roman", "liisbet"], messages: [] };

// call the app function with the initial model
//
//

console.clear()
app(init);
