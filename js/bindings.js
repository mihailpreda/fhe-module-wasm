import SEAL from "node-seal";
let seal;
let parms;
let context;
const MAX_ACCURATE_INTEGER_VALUE = 516000;
export const js_to_rust_initialize = async () => {
  seal = await SEAL();
  return seal;
};

export const js_to_rust_set_encryption_scheme = (scheme) => {
  switch (scheme) {
    case "bfv":
      parms = seal.EncryptionParameters(seal.SchemeType.bfv);
      return parms;
    case "ckks":
      parms = seal.EncryptionParameters(seal.SchemeType.ckks);
      return parms;
    case "bgv":
      parms = seal.EncryptionParameters(seal.SchemeType.bgv);
      return parms;
    default:
      parms = seal.EncryptionParameters(seal.SchemeType.bfv);
      return parms;
  }
};

export const js_to_rust_setup_context = (
  polyModulusDegree,
  bitSizes,
  bitSize,
  securityLevel
) => {
  switch (securityLevel) {
    case "tc128":
      securityLevel = seal.SecurityLevel.tc128;
      break;
    case "tc192":
      securityLevel = seal.SecurityLevel.tc192;
      break;
    case "tc256":
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
  parms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));

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
};

export const js_to_rust_generate_keys = () => {
  const keyGenerator = seal.KeyGenerator(context);
  const publicKey = keyGenerator.createPublicKey();
  const secretKey = keyGenerator.secretKey();
  return [publicKey, secretKey];
};
export const js_to_rust_encrypt = (plainText, publicKey) => {
  const encoder = seal.BatchEncoder(context);
  const encryptor = seal.Encryptor(context, publicKey);
  // Create data to be encrypted
  const array = Int32Array.from(plainText);

  // Encode the Array
  const encodedPlainText = encoder.encode(array);

  // Encrypt the PlainText
  const cipherText = encryptor.encrypt(encodedPlainText);

  return cipherText.saveArray();
};

export const js_to_rust_decrypt = (cipherText, secretKey) => {
  //need to create a new CipherText with current context
  const preparedCipherText = seal.CipherText({ context: context });

  preparedCipherText.loadArray(context, cipherText);

  const encoder = seal.BatchEncoder(context);
  const decryptor = seal.Decryptor(context, secretKey);

  // Decrypt the CipherText
  const decryptedPlainText = decryptor.decrypt(preparedCipherText);

  // Decode the PlainText
  const decodedArray = encoder.decode(decryptedPlainText);

  return decodedArray;
};

export const js_to_rust_add_ciphers = (cipherText1, cipherText2) => {
  //need to create a new CipherText with current context
  const preparedCipherText1 = seal.CipherText({ context: context });
  const preparedCipherText2 = seal.CipherText({ context: context });
  const result = seal.CipherText({ context: context });
  preparedCipherText1.loadArray(context, cipherText1);
  preparedCipherText2.loadArray(context, cipherText2);
  const evaluator = seal.Evaluator(context);
  evaluator.add(preparedCipherText1, preparedCipherText2, result);

  return result.saveArray();
};

export const js_to_rust_sub_ciphers = (cipherText1, cipherText2) => {
  //need to create a new CipherText with current context
  const preparedCipherText1 = seal.CipherText({ context: context });
  const preparedCipherText2 = seal.CipherText({ context: context });
  const result = seal.CipherText({ context: context });
  preparedCipherText1.loadArray(context, cipherText1);
  preparedCipherText2.loadArray(context, cipherText2);
  const evaluator = seal.Evaluator(context);
  evaluator.sub(preparedCipherText1, preparedCipherText2, result);
  return result.saveArray();
};

export const js_to_rust_multiply_ciphers = (cipherText1, cipherText2) => {
  //need to create a new CipherText with current context
  const preparedCipherText1 = seal.CipherText({ context: context });
  const preparedCipherText2 = seal.CipherText({ context: context });
  const result = seal.CipherText({ context: context });
  preparedCipherText1.loadArray(context, cipherText1);
  preparedCipherText2.loadArray(context, cipherText2);
  const evaluator = seal.Evaluator(context);
  evaluator.multiply(preparedCipherText1, preparedCipherText2, result);

  return result.saveArray();
};

export const js_to_rust_square_cipher = (cipherText1) => {
  //need to create a new CipherText with current context
  const preparedCipherText1 = seal.CipherText({ context: context });

  const result = seal.CipherText({ context: context });
  preparedCipherText1.loadArray(context, cipherText1);

  const evaluator = seal.Evaluator(context);
  evaluator.square(preparedCipherText1, result);

  return result.saveArray();
};

export const js_to_rust_exponentiate_cipher = (cipherText1, power) => {
  const keyGenerator = seal.KeyGenerator(context);
  const relinKeys = keyGenerator.createRelinKeys();
  //need to create a new CipherText with current context
  const preparedCipherText1 = seal.CipherText({ context: context });
  const result = seal.CipherText({ context: context });
  preparedCipherText1.loadArray(context, cipherText1);

  const evaluator = seal.Evaluator(context);
  evaluator.exponentiate(preparedCipherText1, power, relinKeys, result);

  return result.saveArray();
};

export const js_to_rust_negate_cipher = (cipherText1) => {
  //need to create a new CipherText with current context
  const preparedCipherText1 = seal.CipherText({ context: context });

  const result = seal.CipherText({ context: context });
  preparedCipherText1.loadArray(context, cipherText1);

  const evaluator = seal.Evaluator(context);
  evaluator.negate(preparedCipherText1, result);

  return result.saveArray();
};

export const js_to_rust_add_plain = (cipherText, plainText) => {
  //need to create a new CipherText with current context
  const preparedCipherText = seal.CipherText({ context: context });
  const encoder = seal.BatchEncoder(context);
  const preparedPlainText = encoder.encode(plainText);
  const result = seal.CipherText({ context: context });
  preparedCipherText.loadArray(context, cipherText);
  
  const evaluator = seal.Evaluator(context);
  evaluator.addPlain(preparedCipherText, preparedPlainText, result);

  return result.saveArray();
};

// export const js_to_rust_sum_elements = (cipherText1, scheme) => {
//   let schemeType;
//   switch (scheme) {
//     case "bfv":
//       schemeType = seal.SchemeType.bfv;
//       break;
//     case "ckks":
//       schemeType = seal.SchemeType.ckks;
//       break;
//     case "bgv":
//       schemeType = seal.SchemeType.bgv;
//       break;
//     default:
//       schemeType = seal.SchemeType.bfv;
//       break;
//   }
//   const keyGenerator = seal.KeyGenerator(context);
//   const galoisKeys = keyGenerator.createGaloisKeys();
//   const preparedCipherText1 = seal.CipherText({ context: context });
//   const result = seal.CipherText({ context: context });
//   preparedCipherText1.loadArray(context, cipherText1);

//   const evaluator = seal.Evaluator(context);

//   evaluator.sumElements(preparedCipherText1, galoisKeys, schemeType, result);
//   return result.saveArray();
// };
