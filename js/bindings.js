import SEAL from 'node-seal';
let seal;
export const initialize = async () => {
    seal = await SEAL();
    return seal;
}

export const encrypt = (text) => {
    console.log(seal);
    
}