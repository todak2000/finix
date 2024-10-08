/* eslint-disable import/no-named-as-default */
import AddBank from './add-bank';
import Bank from './bank';
import Crypto from './crypto';
import DepositCard from './deposit-card';
import Finix from './finix';
import FundingOptions from './fundingOptions';
import BankInstructions from './instructions';
import TransactionDetails from './transaction-details';
import WithdrawBank from './withdraw-bank';
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
    case 'add-bank':
      return <AddBank />;
    case 'withdraw-bank':
      return <WithdrawBank />;
    case 'deposit-card':
      return <DepositCard />;
    case 'transaction-details':
      return <TransactionDetails data={data} />;

    default:
      return (
        <span>
          {type} {data as string}
        </span>
      );
  }
};
