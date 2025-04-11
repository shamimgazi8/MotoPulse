'use client';

import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ImFacebook, ImLinkedin2 } from 'react-icons/im';
import { IoIosLink } from 'react-icons/io';

const socialData = [
  {
    id: 1,
    link: 'https://www.facebook.com/sharminfurniturebd',
    icon: <ImFacebook />,
  },
  {
    id: 2,
    link: '#',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    link: '#',
    icon: <ImLinkedin2 />,
  },
  {
    id: 4,
    link: '/',
    icon: <IoIosLink />,
  },
  {
    id: 4,
    link: '#',
    icon: <FaYoutube />,
  },
  {
    id: 4,
    link: '#',
    icon: <FaInstagram />,
  },
];

interface propTypes {
  classes?: {
    root?: string;
    link?: string;
  };
}

export const SocialLinks = ({ classes }: propTypes) => {
  return (
    <ul
      className={`flex items-center gap-5 text-xl mb-3 ${
        classes?.root ? classes.root : ''
      }`}
    >
      {socialData?.map((item, i) => {
        return (
          <li key={i}>
            {/* <TempComp /> */}
            <a href={item?.link}> {item?.icon}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
