import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import navData from '@/data/nav-data.json';
const NavBar = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center backdrop-blur-md">
        {navData?.map((NavItem, i) => {
          return (
            <li key={i} className="group/item-1 relative backdrop-blur-md">
              <Link
                href={NavItem?.link}
                className="flex items-center gap-1 p-6 hover:!text-gradient font-normal backdrop-blur-md"
              >
                {NavItem?.title}
                {NavItem.children && <FiChevronDown className="mt-[2px]" />}
              </Link>

              {NavItem?.children && (
                <ul className="min-w-[260px] absolute  bg-white/90 backdrop-blur-md py-2 pl-4 pr-0 rounded-md  shadow-lg opacity-0 invisible top-[100%] left-0 group-hover/item-1:visible group-hover/item-1:opacity-100">
                  {NavItem?.children?.map((NavItemChild: any, i: any) => {
                    return (
                      <li
                        className="overflow-hidden group/item-2 w-full"
                        key={i}
                      >
                        <Link
                          href={NavItemChild?.link}
                          className="group/test grid grid-cols-[auto_1fr_auto]  p-2 hover:text-gradient text-black font-semibold items-center gap-2 translate-x-[-30px] hover:translate-x-0 transition"
                        >
                          <span className="block shrink-0 test w-[15px] h-[10px] bg-gradient-to-r from-primary to-secondary"></span>
                          <span className="group-hover/item-2:text-gradient">
                            {NavItemChild.title}
                          </span>
                          {NavItemChild?.children && (
                            <span className="flex w-[10px] h-[10px] bg-gradient-to-r from-primary to-secondary test-2">
                              <FaLongArrowAltRight />
                            </span>
                          )}
                        </Link>
                        {NavItem?.children?.length - 1 !== i && (
                          <span className="block w-[calc(100%-16px)] h-[1px] bg-[#eee]"></span>
                        )}

                        {NavItemChild?.children && (
                          <ul className="min-w-[300px] min-h-[300px] absolute bg-white/90 backdrop-blur-md group p-4 pr-0 rounded-md  shadow-lg opacity-0 invisible top-0  left-[100%] group-hover/item-2:visible group-hover/item-2:opacity-100">
                            {NavItemChild?.children?.map(
                              (NavItemChildOfChild: any, i: any) => {
                                return (
                                  <li
                                    key={i}
                                    className="overflow-hidden group/item-3 group-hover:text-black"
                                  >
                                    <Link
                                      href={NavItemChildOfChild?.link}
                                      className="flex p-2 hover:text-inherit text-black font-normal items-center gap-2 translate-x-[-30px] hover:translate-x-0 transition"
                                    >
                                      <span className="block shrink-0 test w-[15px] h-[10px] bg-gradient-to-r from-primary to-secondary"></span>
                                      <span className="group-hover/item-3:text-gradient">
                                        {NavItemChildOfChild.title}
                                      </span>
                                      {NavItemChildOfChild?.children && (
                                        <span className="flex w-[10px] h-[10px] bg-gradient-to-r from-primary to-secondary test-2"></span>
                                      )}
                                    </Link>

                                    {NavItemChild?.children?.length - 1 !==
                                      i && (
                                      <span className="block w-[calc(100%-16px)] h-[1px] bg-[#eee]"></span>
                                    )}

                                    {NavItemChildOfChild?.children && (
                                      <ul className="min-w-[200px] absolute bg-white/90 backdrop-blur-md p-4 pr-0 rounded-md  shadow-lg opacity-0 invisible top-0  left-[100%] group-hover/item-3:visible group-hover/item-3:opacity-100">
                                        {NavItemChildOfChild?.children?.map(
                                          (item4: any, i: any) => {
                                            return (
                                              <li
                                                key={i}
                                                className="overflow-hidden"
                                              >
                                                <Link
                                                  href={item4?.link}
                                                  className="flex p-2 hover:text-inherit text-black font-normal items-center gap-2 translate-x-[-30px] hover:translate-x-0 transition"
                                                >
                                                  <span className="block test w-[15px] h-[10px] bg-gradient-to-r from-primary to-secondary"></span>
                                                  <span className="group-hover/item-3:text-gradient">
                                                    {item4.title}
                                                  </span>
                                                </Link>
                                                {NavItemChildOfChild?.children
                                                  ?.length -
                                                  1 !==
                                                  i && (
                                                  <span className="block w-[calc(100%-16px)] h-[1px] bg-[#eee]"></span>
                                                )}
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    )}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavBar;
