// credits to heroicons.com for these SVGs

interface SvgIconProps {
  size: number;
}

const LightBulb = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M9.97308 18H11V13H13V18H14.0269C14.1589 16.7984 14.7721 15.8065 15.7676 14.7226C15.8797 14.6006 16.5988 13.8564 16.6841 13.7501C17.5318 12.6931 18 11.385 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3843 6.46774 12.6917 7.31462 13.7484C7.40004 13.855 8.12081 14.6012 8.23154 14.7218C9.22766 15.8064 9.84103 16.7984 9.97308 18ZM10 20V21H14V20H10ZM5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.624 15.7748 16 17 16 18.5V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V18.5C8 17 6.37458 15.7736 5.75395 14.9992Z'></path>
  </svg>
);

const Archive = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M3 10H2V4.00293C2 3.44903 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.43788 22 4.00293V10H21V20.0015C21 20.553 20.5551 21 20.0066 21H3.9934C3.44476 21 3 20.5525 3 20.0015V10ZM19 10H5V19H19V10ZM4 5V8H20V5H4ZM9 12H15V14H9V12Z'></path>
  </svg>
);

const Delete = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z'></path>
  </svg>
);

const Menu = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z'></path>
  </svg>
);

const NewNote = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z'></path>
  </svg>
);

const Signout = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z'></path>
  </svg>
);

const MoreActions = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z'></path>
  </svg>
);
const Undo = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z'></path>
  </svg>
);

const Redo = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z'></path>
  </svg>
);

const ArrowDropDown = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M12 14L8 10H16L12 14Z'></path>
  </svg>
);

const Bold = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z'></path>
  </svg>
);

const Italic = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z'></path>
  </svg>
);

const Underline = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z'></path>
  </svg>
);

const Strikethrough = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11H13.076Z'></path>
  </svg>
);

const Code = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z'></path>
  </svg>
);

const Pin = ({ size }: SvgIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='currentColor'
  >
    <path d='M13.8273 1.69L22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69ZM14.5344 5.22554L9.86358 9.89637L7.0417 10.4607L13.5418 16.9609L14.1062 14.139L18.7771 9.46818L14.5344 5.22554Z'></path>
  </svg>
);

export {
  LightBulb,
  Archive,
  Delete,
  Menu,
  NewNote,
  Signout,
  MoreActions,
  Undo,
  Redo,
  ArrowDropDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Pin,
};
