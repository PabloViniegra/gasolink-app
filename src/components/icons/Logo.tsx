export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 5C25.65 10.5 36 20 24 43C12 20 22.35 10.5 24 5Z"
        fill="#2563eb"
      />
      <rect
        x="18"
        y="24"
        width="12"
        height="13"
        rx="2"
        fill="#fbbf24"
        stroke="#fff"
        strokeWidth="1.5"
      />
      <rect x="21" y="27" width="6" height="6" rx="1.2" fill="#fff" />
      <path
        d="M30 30Q34 31 32 36"
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="36" r="1.2" fill="#fbbf24" />
    </svg>
  );
}
