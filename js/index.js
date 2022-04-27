import("../pkg/index.js").then(async module => {
 
    await module.rust_initialize();
    module.rust_set_scheme('bfv');
    module.rust_setup_context(4096,[36,36,37],20,'tc128')
    const[publicKey,secretKey] = module.rust_generate_keys();
    const data = [6,5,4,3,2,1];
    console.log('plain',data)
    const encrypted = module.rust_encrypt(data,publicKey);
    console.log('encrypted',encrypted);
    const data2=[100,200,300];
    const encrypted2 = module.rust_encrypt(data2,publicKey);
    let result;
    let intermediaryResult;
    result = module.rust_add_ciphers(encrypted,encrypted2);
    intermediaryResult = module.rust_decrypt(result,secretKey);
    console.log('decrypted add',intermediaryResult);

    result = module.rust_sub_ciphers(encrypted,encrypted2);
    intermediaryResult = module.rust_decrypt(result,secretKey);
    console.log('decrypted sub',intermediaryResult);

    result = module.rust_multiply_ciphers(encrypted,encrypted2);
    intermediaryResult = module.rust_decrypt(result,secretKey);
    console.log('decrypted mul',intermediaryResult);

    result = module.rust_square_cipher(encrypted);
    intermediaryResult = module.rust_decrypt(result,secretKey);
    console.log('decrypted square',intermediaryResult);

    result = module.rust_exponentiate_cipher(encrypted,2);
    intermediaryResult = module.rust_decrypt(result,secretKey);
    console.log('decrypted exponetiate',intermediaryResult);

    result = module.rust_negate_cipher(result)
    intermediaryResult = module.rust_decrypt(result,secretKey);
    console.log('decrypted negate',intermediaryResult);
    
    result = module.rust_multiply_plain(encrypted,data2);
    intermediaryResult = module.rust_decrypt(result,secretKey);
    console.log('decrypted mul plain',intermediaryResult);

 
}).catch(console.error);
