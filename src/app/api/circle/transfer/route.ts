/* eslint-disable no-console */

import { NextResponse } from 'next/server';

import { createTransferWalletToWallet } from '@/lib/circle/circle';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const wallet = await createTransferWalletToWallet(data);
    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Error creating wallet:', error);
    return NextResponse.json(
      { error: 'Failed to create transfer' },
      { status: 500 }
    );
  }
}
