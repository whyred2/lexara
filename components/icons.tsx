import {
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  SunMoon,
  CalendarClock,
  BarChart3,
  ChartNoAxesCombined,
  MonitorSmartphone,
  Minus,
  Check,
  CheckCircle,
  Sparkle,
  Sparkles,
  User,
  Info,
  Globe,
  LoaderPinwheel,
  LoaderCircle,
  type Icon as LucideIcon,
} from "lucide-react";

import google from "@/public/icons/google.svg";

export type Icon = typeof LucideIcon;

export const Icons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,

  sun: Sun,
  moon: Moon,
  sunMoon: SunMoon,

  calendarClock: CalendarClock,
  barChart3: BarChart3,
  chartNoAxes: ChartNoAxesCombined,
  monitorSmartphone: MonitorSmartphone,

  minus: Minus,
  check: Check,
  checkCircle: CheckCircle,
  sparkle: Sparkle,
  sparkles: Sparkles,

  user: User,
  info: Info,

  globe: Globe,

  loader: LoaderPinwheel,
  loaderCircle: LoaderCircle,

  windows: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 48 48"
      {...props}
    >
      <path d="M7,6h15c0.552,0,1,0.448,1,1v15c0,0.552-0.448,1-1,1H7c-0.552,0-1-0.448-1-1V7	C6,6.448,6.448,6,7,6z"></path>
      <path d="M25.042,21.958V7c0-0.552,0.448-1,1-1H41c0.552,0,1,0.448,1,1v14.958	c0,0.552-0.448,1-1,1H26.042C25.489,22.958,25.042,22.511,25.042,21.958z"></path>
      <path d="M7,25h15c0.552,0,1,0.448,1,1v15c0,0.552-0.448,1-1,1H7c-0.552,0-1-0.448-1-1V26	C6,25.448,6.448,25,7,25z"></path>
      <path d="M25,41V26c0-0.552,0.448-1,1-1h15c0.552,0,1,0.448,1,1v15c0,0.552-0.448,1-1,1H26	C25.448,42,25,41.552,25,41z"></path>
    </svg>
  ),

  android: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      id="Layer_3"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        d="M24,14.088C11.427,14.088,1.108,23.716,0,36h48C46.892,23.716,36.573,14.088,24,14.088z
	 M33.179,27.079c0-1.104,0.895-1.999,1.999-1.999c1.104,0,1.999,0.895,1.999,1.999c0,1.104-0.895,1.999-1.999,1.999
	C34.074,29.078,33.179,28.183,33.179,27.079z M12.822,29.078c-1.104,0-1.999-0.895-1.999-1.999c0-1.104,0.895-1.999,1.999-1.999
	s1.999,0.895,1.999,1.999C14.821,28.183,13.926,29.078,12.822,29.078z"
      />
      <path
        d="M34.038,19.313c-0.14,0-0.281-0.035-0.41-0.11c-0.393-0.227-0.527-0.729-0.301-1.122l5.197-9.008
	c0.227-0.394,0.729-0.529,1.122-0.301c0.393,0.227,0.527,0.729,0.301,1.122l-5.197,9.008C34.598,19.166,34.322,19.313,34.038,19.313
	z"
      />
      <path
        d="M13.962,19.313c-0.284,0-0.56-0.148-0.712-0.411L8.054,9.894C7.827,9.501,7.962,8.999,8.354,8.772
	c0.392-0.228,0.895-0.093,1.122,0.301l5.197,9.008c0.227,0.394,0.092,0.896-0.301,1.122C14.243,19.278,14.102,19.313,13.962,19.313z
	"
      />
    </svg>
  ),

  google: (props: React.SVGProps<SVGSVGElement>) => google({ ...props }),

  github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
    </svg>
  ),
};
