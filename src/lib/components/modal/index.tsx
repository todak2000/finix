/* eslint-disable import/no-named-as-default */
import Bank from './bank';
import Crypto from './crypto';
import Finix from './finix';
import FundingOptions from './fundingOptions';
import BankInstructions from './instructions';
import WithdrawOptions from './withdrawOptions';

export const ModalChild = (
  type: string,
  data?: string | number | unknown | object
) => {
  switch (type) {
    case 'funding-options':
      return <FundingOptions />;
    case 'bank':
      return <Bank />;
    case 'withdraw-options':
      return <WithdrawOptions />;
    case 'finix':
      return <Finix />;
    case 'instructions':
      return <BankInstructions data={data} />;
    case 'crypto':
      return <Crypto />;
    default:
      return (
        <span>
          {type} {data as string}
        </span>
      );
  }
};
