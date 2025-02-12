const DevLoggerColours = (color = "black", msg: string, ...args) => {
  let bgc = "White";
  switch (color) {
    case "success":
      color = "Green";
      bgc = "LimeGreen";
      break;
    case "info":
      color = "DodgerBlue";
      bgc = "LightBlue";
      break;
    case "error":
      color = "Red";
      bgc = "Black";
      break;
    case "start":
      color = "OliveDrab";
      bgc = "PaleGreen";
      break;
    case "warning":
      color = "Tomato";
      bgc = "Black";
      break;
    case "end":
      color = "Orchid";
      bgc = "MediumVioletRed";
      break;
    default:
      color = color;
  }

  console.log(
    "%c" + msg,
    "color:" +
      color +
      ";font-weight:bold; border: 1px solid " +
      bgc +
      "; border-radius: 4px; padding: 0 3px;",
    ...args
  );
};

const types = new Map<string, string>();
types.set("GENERATE", "info");
types.set("RENDER", "end");
types.set("REFRESH", "success");

// ** Helpful console logger with Dev purposes.
// ** Gets removed from production build.
export const _DevLogger_ = (location: string, variable: string, ...args) => {
  // ** Different colours are used to some the difference between where in the logic the log was called from.
  const value = types.get(location) || "";

  DevLoggerColours(value, location, variable, ...args);
};
