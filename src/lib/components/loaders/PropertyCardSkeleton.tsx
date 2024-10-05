import { FaRegImage } from 'react-icons/fa6';

const PropertyCardSkeleton = () => {
  return (
    <div className="bg-transaprent font-roboto relative flex w-full animate-pulse flex-col items-start justify-between rounded-xl">
      <span className="flex h-[21rem] w-full flex-row items-center justify-center bg-gray-300 object-cover md:h-[315px] lg:h-[365px] 2xl:h-[420px]">
        <FaRegImage className="h-8 w-8 lg:h-16 lg:w-16" />
      </span>
      <div className="flex w-full flex-col justify-around p-2">
        <span className="my-2 flex flex-row items-center justify-between">
          <h6 className="h-5 w-2/3 rounded-lg bg-gray-300" aria-hidden="true" />
          <div
            className="inline-flex h-5 w-20 items-center justify-center self-stretch rounded-lg bg-gray-300 px-2 py-1.5 opacity-80"
            aria-hidden="true"
          />
        </span>
        <span className="my-2 flex w-full flex-row items-center justify-between">
          {[1, 2, 3].map((i) => {
            return (
              <div key={i} className="h-4 w-20 rounded-lg bg-gray-300">
                {' '}
              </div>
            );
          })}
          {/* <p className="h-1 w-15 bg-gray-300"></p>
          <p className="h-1 w-15 bg-gray-300"></p> */}
        </span>
      </div>
      {/* Overlay Buttons */}
      {/* <div className="absolute top-0 flex h-[15.5rem] w-full flex-col items-center justify-between px-2 py-2 md:h-[16.5rem] md:px-4 md:py-6">
        <span className="flex w-full flex-row items-center justify-between">
          <button className="flex h-8 w-1/3 flex-row items-center justify-center rounded-2xl bg-[#ffffff80]"></button>
          <button className="flex h-9 w-9 flex-col items-center justify-center rounded-full bg-[#12365430]"></button>
        </span>
        <span className="flex w-full flex-row items-center justify-between">
          <button className="block h-4 w-28 rounded-full bg-gray-600"></button>
          <button className="ml-auto flex h-9 w-9 flex-col items-center justify-center rounded-full bg-[#00000030] md:ml-0"></button>
        </span>
      </div> */}
    </div>
  );
};

export default PropertyCardSkeleton;
