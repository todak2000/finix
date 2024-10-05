import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';

import logo from '../../../../public/logo.svg';

const PageLoader = () => {
  return (
    <div className="h-full w-full animate-pulse">
      <div className="hidden h-28 w-full flex-row items-center justify-between bg-white md:flex">
        <div className="mx-auto flex w-full flex-row items-center justify-between px-[6%] 2xl:w-[80%] 2xl:max-w-[1564px]">
          <div className="flex w-1/4 flex-row items-center justify-between space-x-2">
            {[1, 2, 3, 4].map((i) => {
              const randomWidth =
                Math.floor(Math.random() * (70 - 20 + 1)) + 40; // Random width between 20 and 100
              return (
                <span
                  className="h-[20px] cursor-pointer rounded-full bg-gray-300"
                  style={{ width: `${randomWidth}px` }}
                  key={i}
                />
              );
            })}
          </div>
          <div className="">
            <Image src={logo} alt="logo" width={80} height={50} />
          </div>
          <div className="flex w-1/3 flex-row items-center justify-between">
            {[1, 2, 3].map((i) => {
              return (
                <span
                  className="h-[20px] w-16 cursor-pointer rounded-full bg-gray-300"
                  key={i}
                />
              );
            })}

            <button
              className="flex h-10 w-24 border-spacing-2 flex-row items-center justify-center rounded-3xl bg-gray-300"
              aria-label="Menu Button"
              type="button"
            />
          </div>
        </div>
      </div>
      <div className="flex h-20 w-full flex-row items-center justify-between px-[6%] md:hidden">
        <div className="">
          <Image src={logo} alt="logo" width={80} height={50} />
        </div>

        <span className="flex h-8 w-8 flex-row items-center justify-center text-xl">
          <RxHamburgerMenu />
        </span>
      </div>

      <div className="flex h-[80vh] w-full flex-col items-center justify-center bg-gray-300 md:h-[60vh]">
        <div className="relative flex h-full w-full flex-col items-center justify-center px-[6%] md:w-full 2xl:mx-auto 2xl:max-w-[1564px]">
          <div className="flex h-40 w-full flex-col items-center justify-center gap-5">
            <div className="h-10 w-2/3 rounded-full bg-slate-50" />
            <div className="h-4 w-3/5 rounded-full bg-slate-100" />
          </div>
          <div className="mt-40 h-16 w-[97%] rounded-2xl bg-white md:hidden" />
          <div className="absolute bottom-[-3.5rem] hidden h-[7.25rem] w-[87%] rounded-3xl bg-white shadow-lg md:flex 2xl:w-[84%]" />
        </div>
      </div>
      {/* <div className="mx-auto hidden w-full flex-col items-center justify-center gap-16 px-[8%] md:flex 2xl:max-w-[1564px]">
        <div className="flex h-20 w-11/12 flex-col items-center justify-center gap-4">
          <div className="h-3 w-1/4 text-[#3fad6b]"></div>
          <div className="h-5 w-2/4 text-[#222222]"></div>
        </div>
        <div className="inline-flex grid w-full grid-cols-2 items-center justify-start gap-8 md:grid-cols-4">
          {[1, 2, 3, 4].map(() => {
            return (
              <div
                key={key()}
                className="inline-flex w-[11.5] flex-col items-center justify-end bg-gray-300 pb-4 pl-4 pr-[217px] pt-[253px] md:w-[17.5rem]"
              >
                <div className="inline-flex items-center justify-center gap-2.5 self-stretch bg-white px-2 py-1.5 opacity-80">
                  <div className="h-5 w-12 bg-[#757575]">
                    <span className="h-1 w-6 bg-[#000000]"></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default PageLoader;
