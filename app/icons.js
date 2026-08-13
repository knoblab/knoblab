function Icon({ children, size = 16, style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      {children}
    </svg>
  );
}

const Sun = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Icon>
);

const Moon = (props) => (
  <Icon {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);

const ArrowRight = (props) => (
  <Icon {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Icon>
);

const ArrowUpRight = (props) => (
  <Icon {...props}>
    <path d="M7 17L17 7M7 7h10v10" />
  </Icon>
);

const Check = (props) => (
  <Icon {...props}>
    <path d="M20 6L9 17l-5-5" />
  </Icon>
);

const Code2 = (props) => (
  <Icon {...props}>
    <path d="M18 16l4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
  </Icon>
);

window.Sun = Sun;
window.Moon = Moon;
window.ArrowRight = ArrowRight;
window.ArrowUpRight = ArrowUpRight;
window.Check = Check;
window.Code2 = Code2;

export { Sun, Moon, ArrowRight, ArrowUpRight, Check, Code2 };

