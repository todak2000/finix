/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';

export const convertTimestamp = (seconds: number): string => {
  return moment.unix(seconds).format('MMMM D, YYYY');
};
