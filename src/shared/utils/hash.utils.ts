import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";

const scrypt = promisify(_scrypt);

export async function generateHash(plaintext: string, salt: string): Promise<string> {

    // Hash the salt and the password together
    const hash = (await scrypt(plaintext, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    return hash.toString('hex');
}

export async function generateHashForPassword(plaintext: string): Promise<string> {

    const salt = randomBytes(8).toString('hex');

    const hash = await generateHash(plaintext, salt)

    // Join the hashed result and the salt together
    return salt + '.' + hash;
}

