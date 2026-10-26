export function FlagBrazil({
  className = "inline-block h-3.5 w-5 shrink-0 rounded-[2px] shadow-xs align-middle",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bandeira do Brasil"
    >
      <rect width="20" height="14" fill="#009C3B" rx="1" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="3.4" fill="#002776" />
      <path
        d="M6.8 6.4C8.2 5.8 11.8 5.9 13.2 7.7"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlagUSA({
  className = "inline-block h-3.5 w-5 shrink-0 rounded-[2px] shadow-xs align-middle",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bandeira dos Estados Unidos"
    >
      <rect width="20" height="14" fill="#B22234" rx="1" />
      <path
        d="M0 1.08H20V2.15H0V1.08ZM0 3.23H20V4.31H0V3.23ZM0 5.38H20V6.46H0V5.38ZM0 7.54H20V8.62H0V7.54ZM0 9.69H20V10.77H0V9.69ZM0 11.85H20V12.92H0V11.85Z"
        fill="#FFFFFF"
      />
      <rect width="8" height="7.54" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        <circle cx="1.6" cy="1.5" r="0.45" />
        <circle cx="3.2" cy="1.5" r="0.45" />
        <circle cx="4.8" cy="1.5" r="0.45" />
        <circle cx="6.4" cy="1.5" r="0.45" />
        <circle cx="2.4" cy="2.8" r="0.45" />
        <circle cx="4.0" cy="2.8" r="0.45" />
        <circle cx="5.6" cy="2.8" r="0.45" />
        <circle cx="1.6" cy="4.1" r="0.45" />
        <circle cx="3.2" cy="4.1" r="0.45" />
        <circle cx="4.8" cy="4.1" r="0.45" />
        <circle cx="6.4" cy="4.1" r="0.45" />
        <circle cx="2.4" cy="5.4" r="0.45" />
        <circle cx="4.0" cy="5.4" r="0.45" />
        <circle cx="5.6" cy="5.4" r="0.45" />
        <circle cx="1.6" cy="6.6" r="0.45" />
        <circle cx="3.2" cy="6.6" r="0.45" />
        <circle cx="4.8" cy="6.6" r="0.45" />
        <circle cx="6.4" cy="6.6" r="0.45" />
      </g>
    </svg>
  );
}

export function FlagIreland({
  className = "inline-block h-3.5 w-5 shrink-0 rounded-[2px] shadow-xs align-middle",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bandeira da Irlanda"
    >
      <rect width="6.67" height="14" fill="#169B62" />
      <rect x="6.67" width="6.67" height="14" fill="#FFFFFF" />
      <rect x="13.33" width="6.67" height="14" fill="#FF883E" />
    </svg>
  );
}
