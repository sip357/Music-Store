import { ReactNode } from "react";
import Link from "next/link";

type HeaderIconProps = {
  href: string; // The URL the icon links to
  svgPath: ReactNode; // The SVG path(s) to render
  children?: ReactNode; // Optional children, like badges or extra elements
};

const HeaderIcon: React.FC<HeaderIconProps> = ({ href, svgPath, children }) => (
  <Link href={href} className="flex items-center hover:text-gray-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {svgPath}
    </svg>
    {children}
  </Link>
);

export default HeaderIcon;

