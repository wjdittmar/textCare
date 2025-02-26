import React from "react";

const ACTIVE_COLOR = "#4CAF93";
const DEFAULT_COLOR = "#3f3f3f";

export const HomeIcon: React.FC<{ active?: boolean }> = ({ active }) => {
  const strokeColor = active ? ACTIVE_COLOR : DEFAULT_COLOR;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 3H4C3.44772 3 3 3.44772 3 4V11C3 11.5523 3.44772 12 4 12H9C9.55228 12 10 11.5523 10 11V4C10 3.44772 9.55228 3 9 3Z"
        stroke={strokeColor}
        {...(active ? { fill: strokeColor } : {})}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M20 3H15C14.4477 3 14 3.44772 14 4V7C14 7.55228 14.4477 8 15 8H20C20.5523 8 21 7.55228 21 7V4C21 3.44772 20.5523 3 20 3Z"
        stroke={strokeColor}
        {...(active ? { fill: strokeColor } : {})}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M20 12H15C14.4477 12 14 12.4477 14 13V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20V13C21 12.4477 20.5523 12 20 12Z"
        stroke={strokeColor}
        {...(active ? { fill: strokeColor } : {})}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M9 16H4C3.44772 16 3 16.4477 3 17V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20V17C10 16.4477 9.55228 16 9 16Z"
        stroke={strokeColor}
        {...(active ? { fill: strokeColor } : {})}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export const MessagesIcon: React.FC<{ active?: boolean }> = ({ active }) => {
  const strokeColor = active ? ACTIVE_COLOR : DEFAULT_COLOR;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.5 14C7.5 14.6413 7.57102 15.266 7.70561 15.8666C7.72009 15.9313 7.66984 15.9927 7.60371 15.989C7.12078 15.962 6.65091 15.8861 6.19899 15.7661L2.63925 16.9527C2.01384 17.1612 1.41885 16.5662 1.62732 15.9408L2.49816 13.3283C1.55984 12.1372 1 10.634 1 9C1 5.13401 4.13401 2 8 2C10.6242 2 12.9111 3.44398 14.1095 5.58071C14.142 5.63859 14.1085 5.71096 14.0439 5.72618C10.2924 6.60974 7.5 9.97877 7.5 14Z"
        {...(active ? { fill: strokeColor } : {})}
        {...(!active ? { stroke: strokeColor } : {})}
      ></path>
      <path
        d="M9 14C9 17.866 12.134 21 16 21C16.6227 21 17.2264 20.9187 17.801 20.7661L21.3608 21.9527C21.9862 22.1612 22.5812 21.5662 22.3727 20.9408L21.5018 18.3283C22.4402 17.1372 23 15.634 23 14C23 10.134 19.866 7 16 7C12.134 7 9 10.134 9 14Z"
        {...(active ? { fill: strokeColor } : {})}
        {...(!active ? { stroke: strokeColor } : {})}
      ></path>
    </svg>
  );
};

export const HistoryIcon: React.FC<{ active?: boolean }> = ({ active }) => {
  const strokeColor = active ? ACTIVE_COLOR : DEFAULT_COLOR;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.47375 3.93041H5.1C4.49249 3.93041 4 4.4229 4 5.03042V21.9C4 22.5075 4.49249 23 5.1 23H19.1105C19.718 23 20.2105 22.5075 20.2105 21.9V5.03041C20.2105 4.4229 19.718 3.93041 19.1105 3.93041H16.705M14.2501 2.52131H15.605C16.2125 2.52131 16.705 3.01379 16.705 3.62131V4.71818C16.705 5.32569 16.2125 5.81818 15.605 5.81818H8.57376C7.96624 5.81818 7.47375 5.32569 7.47375 4.71818V3.62131C7.47375 3.01379 7.96624 2.52131 8.57375 2.52131H9.94127C9.94456 2.52131 9.94722 2.51865 9.94722 2.51536C9.94722 1.67845 10.6257 0.999997 11.4626 1L12.7288 1.00001C13.5657 1.00001 14.2441 1.67846 14.2441 2.51536C14.2441 2.51865 14.2468 2.52131 14.2501 2.52131ZM12.3333 9.99999C12.8856 9.99999 13.3333 10.4477 13.3333 11C13.3333 11.5555 13.3333 12.1111 13.3333 12.6667H15C15.5523 12.6667 16 13.1144 16 13.6667V14.3333C16 14.8856 15.5523 15.3333 15 15.3333C14.4444 15.3333 13.8889 15.3333 13.3333 15.3333V17C13.3333 17.5523 12.8856 18 12.3333 18H11.6667C11.1144 18 10.6667 17.5523 10.6667 17V15.3333C10.1111 15.3333 9.55556 15.3333 9 15.3333C8.44772 15.3333 8 14.8856 8 14.3333V13.6667C8 13.1144 8.44772 12.6667 9 12.6667L10.6667 12.6667C10.6667 12.1111 10.6667 11.5555 10.6667 11C10.6667 10.4477 11.1144 9.99999 11.6667 9.99999H12.3333Z"
        {...(active ? { fill: strokeColor } : {})}
        {...(!active ? { stroke: strokeColor } : {})}
        strokeWidth="1.5"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export const AccountIcon: React.FC<{ active?: boolean }> = ({ active }) => {
  const strokeColor = active ? ACTIVE_COLOR : DEFAULT_COLOR;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 20C18 18.4087 17.3679 16.8826 16.2426 15.7574C15.1174 14.6321 13.5913 14 12 14C10.4087 14 8.88258 14.6321 7.75736 15.7574C6.63214 16.8826 6 18.4087 6 20"
        fill={strokeColor}
      ></path>
      <path
        d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z"
        fill={strokeColor}
      ></path>
      <path
        d="M6.5 20L11 18.5L17.5 19.5L16 21.5L11 22L6.5 20Z"
        fill={strokeColor}
      ></path>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={strokeColor}
        strokeWidth="1.5"
      ></circle>
    </svg>
  );
};
