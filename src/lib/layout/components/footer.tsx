import { key } from '@/lib/helpers/uniqueKey';

import {
  footerContentFour,
  footerContentOne,
  footerContentThree,
  footerContentTwo,
} from './constants';

export const Footer = () => {
  return (
    <footer className="dark:inverted bg-[#5179C5] py-8">
      <div className="wrapper mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <h5 className="mb-2 font-bold text-white">Company</h5>

          <ul>
            {footerContentOne.map((i) => {
              return (
                <li key={key()}>
                  <a
                    href={i.link}
                    className="text-sm text-white hover:opacity-70"
                  >
                    {i.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h5 className="mb-2 font-bold text-white">Legal</h5>
          <ul>
            {footerContentTwo.map((i) => {
              return (
                <li key={key()}>
                  <a
                    href={i.link}
                    className="text-sm text-white hover:opacity-70"
                  >
                    {i.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h5 className="mb-2 font-bold text-white">Support</h5>
          <ul>
            {footerContentThree.map((i) => {
              return (
                <li key={key()}>
                  <a
                    href={i.link}
                    className="text-sm text-white hover:opacity-70"
                  >
                    {i.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h5 className="mb-2 font-bold text-white">Connect</h5>
          <div className="flex space-x-4">
            {footerContentFour.map((i) => {
              return (
                <a
                  key={key()}
                  href={i.link}
                  className="text-xl text-white hover:opacity-70"
                >
                  {i.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xs text-white">
          © {new Date().getFullYear()} Finix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// export const Footer = () => {
//   return (
//     <footer className="wrapper">
//       <div className="flex">
//         <p className="text-center text-xs">
//           {/* {new Date().getFullYear()} -{' '} */}
//           <a
//             href="https://github.com/todak2000"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Developed by Daniel Olagunju for the Circle Hackathon 2024
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// };
