/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
    AccountInfo,
    Keypair,
} from '@solana/web3.js';
import BN from "bn.js";
import { serialize, deserialize } from 'borsh';
import { getPayer } from './key';


const POST_SIZE = 64;
const POST_LEN = 8;

const SCREEN_NAME_LEN = 16;
const PROFILE_IMAGE_LEN = 64;

const SOLNES_POST = 1;
const SOLNES_SET_SCREEN_NAME = 3;
const SOLNES_SET_PROFILE_IMAGE = 4;

class SolnesAccount {
    rawScreenName: Uint8Array = new Uint8Array(SCREEN_NAME_LEN);
    rawProfileImage: Uint8Array = new Uint8Array(PROFILE_IMAGE_LEN);
    index = 0;
    rawPosts: Uint8Array = new Uint8Array(POST_SIZE * POST_LEN);

    screenName = '';
    profileImage = '';
    posts: string[] = [];

    constructor(fields: { rawScreenName: Uint8Array, rawProfileImage: Uint8Array, index: number, rawPosts: Uint8Array } | undefined = undefined) {
        if (fields) {
            this.rawScreenName = fields.rawScreenName;
            this.rawProfileImage = fields.rawProfileImage;
            this.index = fields.index;
            this.rawPosts = fields.rawPosts;

            this.screenName = this.makeScreenNameToString(this.rawScreenName);
            this.profileImage = this.makeProfileImageToString(this.rawProfileImage);
            this.posts = this.makePostsToString(this.rawPosts);
        }
    }

    makePostsToString = (rawPosts: Uint8Array): string[] => {
        const messages = [];
        for (let i = 0; i < POST_LEN; i += 1) {
            let offset = 0;
            while (offset < POST_SIZE && rawPosts[i * POST_SIZE + offset] != 0) {
                offset += 1
            }

            const head = i * POST_SIZE;
            const tail = head + offset;
            const post = rawPosts.slice(head, tail);

            const message = new TextDecoder('utf-8').decode(post);
            messages.push(message);
        }
        return messages;
    }

    makeScreenNameToString = (rawScreenName: Uint8Array): string => {
        let offset = 0;
        while (offset < SCREEN_NAME_LEN && rawScreenName[offset] != 0) {
            offset += 1
        }

        return new TextDecoder('utf-8').decode(rawScreenName.slice(0, offset));
    }

    makeProfileImageToString = (rawProfileImage: Uint8Array): string => {
        let offset = 0;
        while (offset < PROFILE_IMAGE_LEN && rawProfileImage[offset] != 0) {
            offset += 1
        }

        return new TextDecoder('utf-8').decode(rawProfileImage.slice(0, offset));
    }
}

/**
 * Borsh schema definition for greeting accounts
 */
const SolnesSchema = new Map([
    [SolnesAccount, {
        kind: 'struct',
        fields: [
            ['rawScreenName', [SCREEN_NAME_LEN]],
            ['rawProfileImage', [PROFILE_IMAGE_LEN]],
            ['index', 'u32'],
            ['rawPosts', [POST_SIZE * POST_LEN]]]
    }],
]);

/**
 * The expected size of each greeting account.
 */
const SOLNES_SIZE = serialize(
    SolnesSchema,
    new SolnesAccount(),
).length;

// export async function newAccountWithLamports(
//     connection: Connection,
//     lamports = 1000000,
// ): Promise<Keypair> {
//     const keypair = Keypair.generate();
//     const signature = await connection.requestAirdrop(
//         keypair.publicKey,
//         lamports,
//     );
//     await connection.confirmTransaction(signature);
//     return keypair;
// }

// export function getRpcUrl(): string {
//     return 'http://localhost:8899';
// }

// export function getConnection(): Connection {
//     const rpcUrl = getRpcUrl();
//     const connection = new Connection(rpcUrl, 'confirmed');
//     return connection;
// }

// export async function establishPayer(connection: Connection): Promise<void> {
//     let fees = 0;
//     let payer = null;
//     const { feeCalculator } = await connection.getRecentBlockhash();

//     // Calculate the cost to fund the greeter account
//     fees += await connection.getMinimumBalanceForRentExemption(SOLNES_SIZE);

//     // Calculate the cost of sending transactions
//     fees += feeCalculator.lamportsPerSignature * 100; // wag

//     try {
//         // Get payer from cli config
//         payer = getPayer();
//     } catch (err) {
//         // Fund a new payer via airdrop
//         payer = await newAccountWithLamports(connection, fees);
//     }

//     const lamports = await connection.getBalance(payer.publicKey);
//     if (lamports < fees) {
//         // This should only happen when using cli config keypair
//         const sig = await connection.requestAirdrop(
//             payer.publicKey,
//             fees - lamports,
//         );
//         await connection.confirmTransaction(sig);
//     }

//     console.log(
//         'Using account',
//         payer.publicKey.toBase58(),
//         'containing',
//         lamports / LAMPORTS_PER_SOL,
//         'SOL to pay for fees',
//     );
// }

// export async function checkProgramAccount(connection: Connection, payer: Keypair): Promise<AccountInfo<Buffer> | null> {
//     const SEED = 'solnes is first syanicat project';
//     const programPubkey = await PublicKey.createWithSeed(
//         payer.publicKey,
//         SEED,
//         programId,
//     );

//     let programAccount = await connection.getAccountInfo(programPubkey);
//     if (programAccount === null) {
//         console.log(
//             'Creating SOLNES account',
//             programPubkey.toBase58(),
//             'and It has ', SOLNES_SIZE, ' space.',
//         );
//         const lamports = await connection.getMinimumBalanceForRentExemption(
//             SOLNES_SIZE,
//         );

//         const transaction = new Transaction().add(
//             SystemProgram.createAccountWithSeed({
//                 fromPubkey: payer.publicKey,
//                 basePubkey: payer.publicKey,
//                 seed: SEED,
//                 newAccountPubkey: programPubkey,
//                 lamports,
//                 space: SOLNES_SIZE,
//                 programId,
//             }),
//         );
//         await sendAndConfirmTransaction(connection, transaction, [payer]);
//         programAccount = await connection.getAccountInfo(programPubkey);
//     }

//     return programAccount;
// }

// export async function postMessage(connection: Connection, programPubkey: PublicKey, payer: Keypair, message: string,): Promise<void> {
//     console.log('post message to ', programId.toBase58());

//     const version = new BN(0).toArray("le", 1);
//     const discrim = new BN(SOLNES_POST).toArray("le", 4);
//     const data = new TextEncoder().encode(message);

//     const instruction = new TransactionInstruction({
//         keys: [{ pubkey: programPubkey, isSigner: false, isWritable: true }],
//         programId,
//         data: Buffer.from(Uint8Array.of(...version, ...discrim, ...data)),
//     });
//     await sendAndConfirmTransaction(
//         connection,
//         new Transaction().add(instruction),
//         [payer],
//     );
// }

// export async function setScreenName(connection: Connection, programPubkey: PublicKey, payer: Keypair, screenName: string): Promise<void> {
//     console.log('set screen name, ', programPubkey.toBase58());

//     const version = new BN(0).toArray("le", 1);
//     const discrim = new BN(SOLNES_SET_SCREEN_NAME).toArray("le", 4);
//     const data = new TextEncoder().encode(screenName);

//     const instruction = new TransactionInstruction({
//         keys: [{ pubkey: programPubkey, isSigner: false, isWritable: true }],
//         programId,
//         data: Buffer.from(Uint8Array.of(...version, ...discrim, ...data)),
//     });
//     await sendAndConfirmTransaction(
//         connection,
//         new Transaction().add(instruction),
//         [payer],
//     );
// }

// export async function setProfileImage(connection: Connection, programPubkey: PublicKey, payer: Keypair, screenName: string): Promise<void> {
//     console.log('set profile image, ', programPubkey.toBase58());

//     const version = new BN(0).toArray("le", 1);
//     const discrim = new BN(SOLNES_SET_PROFILE_IMAGE).toArray("le", 4);
//     const data = new TextEncoder().encode(screenName);

//     const instruction = new TransactionInstruction({
//         keys: [{ pubkey: programPubkey, isSigner: false, isWritable: true }],
//         programId,
//         data: Buffer.from(Uint8Array.of(...version, ...discrim, ...data)),
//     });
//     await sendAndConfirmTransaction(
//         connection,
//         new Transaction().add(instruction),
//         [payer],
//     );
// }


export async function getAccountData(connection: Connection, programAccountPubkey: PublicKey): Promise<SolnesAccount> {
    const accountInfo = await connection.getAccountInfo(programAccountPubkey);
    if (accountInfo === null) {
        throw 'Error: cannot find the account';
    }
    const solnesAccount: SolnesAccount = deserialize(
        SolnesSchema,
        SolnesAccount,
        accountInfo.data,
    );
    return solnesAccount
}