export default function Loading() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 120"
        width="400"
        height="120"
      >
        <path
          d="M40 60L25 45L40 30L55 45L40 60ZM40 90L25 75L40 60L55 75L40 90ZM70 60L55 45L70 30L85 45L70 60Z"
          fill="#2A5C7D"
        />
        <path d="M70 60L85 75L100 60L85 45L70 60Z" fill="#4CAF93" />
        <path d="M100 60L85 75L100 90L115 75L100 60Z" fill="#2A5C7D" />

        <text
          x="140"
          y="80"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
          fontSize="48"
          fill="#333"
        >
          <tspan fill="#2A5C7D">Nex</tspan>
          <tspan fill="#4CAF93">Med</tspan>
        </text>
      </svg>
    </div>
  );
}
