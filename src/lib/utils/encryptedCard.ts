/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMessage, encrypt, readKey } from 'openpgp';

import { getEncryptionKey } from '../circle/circle';

const decodePublicKey = async (publicKey: string) => {
  return readKey({ armoredKey: atob(publicKey) });
};

const createEncryptedMessage = async (cardData: any, decodedPublicKey: any) => {
  const message = await createMessage({ text: JSON.stringify(cardData) });
  return encrypt({
    message,
    encryptionKeys: decodedPublicKey,
  });
};

export const encryptedCard = async (cardData: {
  number?: string; // required when storing card details
  cvv?: string; // required when cardVerification is set to cvv
}) => {
  const { data: keyData } = await getEncryptionKey();
  const decodedPublicKey = await decodePublicKey(keyData.publicKey);
  const ciphertext: any = await createEncryptedMessage(
    cardData,
    decodedPublicKey
  );

  return {
    encryptedMessage: btoa(ciphertext),
    keyId: keyData.keyId,
  };
};
