import MediasIcon from './icons/medias';
import ServersIcon from './icons/servers';
import ContactIcon from './icons/contact';
import TerminalIcon from './icons/terminal';
import RecycleBinIcon from './icons/recycle-bin';
import DocumentationIcon from './icons/documentation';
import { TradeIcon } from './icons/trade';

console.log(`All`, TradeIcon)

const data = [
  {
    section: 'Manager',
    content: [
      {
        title: 'Accounts',
        icon: <TradeIcon />,
        link: '/',
      },
      {
        title: 'Settings',
        icon: <TerminalIcon />,
        link: '/admin/medias',
      },
      // {
      //   title: 'Contacts',
      //   icon: <ContactIcon />,
      //   link: '/admin/contacts',
      // },
    ],
  },
  // {
  //   section: 'Monitoring',
  //   content: [
  //     {
  //       title: 'Terminal',
  //       icon: <TerminalIcon />,
  //       link: '/admin/terminal',
  //     },
  //     {
  //       title: 'Recycle bin',
  //       icon: <RecycleBinIcon />,
  //       link: '/admin/recycle-bin',
  //     },
  //     {
  //       title: 'Servers',
  //       icon: <ServersIcon />,
  //       link: '/admin/servers',
  //     },
  //   ],
  // },
  // {
  //   section: 'Guides',
  //   content: [
  //     {
  //       title: 'Documentation',
  //       icon: <DocumentationIcon />,
  //       link: '/admin/documentation',
  //     },
  //   ],
  // },
];

export default data;
