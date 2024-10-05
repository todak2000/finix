/* eslint-disable import/no-extraneous-dependencies */
import { BsCurrencyExchange } from 'react-icons/bs';
import { FaGlobeAfrica, FaShieldAlt } from 'react-icons/fa';
import { TbDeviceMobileHeart } from 'react-icons/tb';

export interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}
export const featureHeaders = {
  header: 'Features',
  subHeader: 'All You Need for Digital Transactions',
  subText:
    'Explore the powerful features that make our platform the best choice for managing your digital dollars.',
};

export const featuresArr: FeatureProps[] = [
  {
    icon: <FaGlobeAfrica className="h-6 w-6 text-[#3F5AB3]" />,
    title: 'Borderless Transactions',
    description:
      'Send and receive USDC across 180+ countries without the hassle of traditional banking systems.',
  },
  {
    icon: <FaShieldAlt className="h-6 w-6 text-[#3F5AB3]" />,
    title: 'Bank-Grade Security',
    description:
      'Your digital dollars are protected by state-of-the-art encryption and backed 1:1 by US Dollar reserves.',
  },
  {
    icon: <BsCurrencyExchange className="h-6 w-6 text-[#3F5AB3]" />,
    title: 'Seamless Currency Exchange',
    description:
      'Convert between USDC and local currencies with competitive rates and low fees.',
  },
  {
    icon: <TbDeviceMobileHeart className="h-6 w-6 text-[#3F5AB3]" />,
    title: 'Intuitively Mobile Friendly',
    description:
      'Manage your digital dollars on-the-go with our easy-to-use even on your mobile device.',
  },
];
