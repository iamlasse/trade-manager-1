import { Link, useLocation } from "react-router-dom";

import data from "./data";

const style = {
  title: `mx-4 text-sm`,
  section: `font-thin pl-5 text-white mb-6 uppercase lg:pl-6`,
  active: `border-l-4 border-white lg:border-l-0 lg:border-r-4`,
  link: `flex items-center text-gray-200 justify-start my-2 p-3 w-full hover:text-white`,
};

export default function SidenavItems() {
  const { pathname } = useLocation();
  return (
    <ul className="md:pl-6">
      <li>
        {data.map((section) => (
          <div className="mb-12" key={section.section}>
            <div className={style.section}>{section.section}</div>
            {section.content.map((item) => (
              <Link to={item.link} key={item.title}>
                <span
                  className={`${style.link} 
                    ${item.link === pathname ? style.active : ""}`}
                >
                  <span>{item.icon}</span>
                  <span className={style.title}>{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </li>
    </ul>
  );
}
