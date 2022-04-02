import("../pkg/index.js").then(async module => {
 
    await module.rust_initialize();
    module.rust_set_scheme('bfv');
    module.rust_setup_context(4096,[36,36,37],20,'tc128')
    const[publicKey,secretKey] = module.rust_generate_keys();
    const data = [1,5,7,899,516000];
    console.log('plain',data)
    const encrypted = module.rust_encrypt(data,publicKey);
    console.log('encrypted',encrypted);
    const decrypted = module.rust_decrypt(encrypted,secretKey);
    console.log('decrypted',decrypted);
 
  
}).catch(console.error);
