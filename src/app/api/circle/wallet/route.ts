/* eslint-disable no-console */
import { NextResponse } from 'next/server';

import { createWallet } from '@/lib/circle/circle';

export async function POST(request: Request) {
  try {
    const { idempotencyKey, description } = await request.json();
    const wallet = await createWallet(idempotencyKey, description);
    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Error creating wallet:', error);
    return NextResponse.json(
      { error: 'Failed to create wallet' },
      { status: 500 }
    );
  }
}
