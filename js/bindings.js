import SEAL from 'node-seal';
let seal;
let parms;
let context;
export const rust_initialize = async () => {
    seal = await SEAL();
    return seal;
}

export const rust_set_encryption_scheme = (scheme) =>{
    switch (scheme) {
        case 'bfv':
            parms = seal.EncryptionParameters(seal.SchemeType.bfv);
            return parms;
        case 'ckks':
            parms = seal.EncryptionParameters(seal.SchemeType.ckks);
            return parms;
        case 'bgv':
                parms = seal.EncryptionParameters(seal.SchemeType.bgv);
                return parms;
        default:
            parms = seal.EncryptionParameters(seal.SchemeType.bfv);
            return parms;
    }

}

export const rust_setup_context=(polyModulusDegree,bitSizes,bitSize, securityLevel) =>{
  switch (securityLevel) {
      case 'tc128':
        securityLevel = seal.SecurityLevel.tc128;
        break;
        case 'tc192':
        securityLevel = seal.SecurityLevel.tc192;
        break;
        case 'tc256':
        securityLevel = seal.SecurityLevel.tc256;
        break;
      default:
        securityLevel = seal.SecurityLevel.tc128;
        break;
  }
    // Set the PolyModulusDegree
    parms.setPolyModulusDegree(polyModulusDegree);

    // Create a suitable set of CoeffModulus primes
    parms.setCoeffModulus(
      seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
    );

    // Set the PlainModulus to a prime of bitSize 20.
    parms.setPlainModulus(
      seal.PlainModulus.Batching(polyModulusDegree, bitSize)
    );

    context = seal.Context(
      parms, // Encryption Parameters
      true, // ExpandModChain
      securityLevel // Enforce a security level
    );

    // if (!context.parametersSet()) {
    //   throw new Error(
    //     'Could not set the parameters in the given context. Please try different encryption parameters.'
    //   );
    // }
    return context;
}
 
export const rust_generate_keys=() =>{
    const keyGenerator = seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    const secretKey = keyGenerator.secretKey();
    return [publicKey,secretKey];
}
export const rust_encrypt = () => {
    const encoder = seal.BatchEncoder(context);
    const keyGenerator = seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    const secretKey = keyGenerator.secretKey();
    const encryptor = seal.Encryptor(context, publicKey);
    const decryptor = seal.Decryptor(context, secretKey);
    const evaluator = seal.Evaluator(context);
    // Create data to be encrypted
    const array = Int32Array.from([1, 2, 3, 4, 5]);

    // Encode the Array
    const plainText = encoder.encode(array) ;

    // Encrypt the PlainText
    const cipherText = encryptor.encrypt(plainText);

    // Add the CipherText to itself and store it in the destination parameter (itself)
    evaluator.add(cipherText, cipherText, cipherText); // Op (A), Op (B), Op (Dest)

    // Or create return a new cipher with the result (omitting destination parameter)
    // const cipher2x = evaluator.add(cipherText, cipherText)

    // Decrypt the CipherText
    const decryptedPlainText = decryptor.decrypt(cipherText);

    // Decode the PlainText
    const decodedArray = encoder.decode(decryptedPlainText);

    console.log('decodedArray', decodedArray);
    
}