export function generateAccessCode() {
    let codigo = '';

    for (let i = 0; i < 5; i++) {
      codigo += Math.floor(Math.random() * 10);
    }

    return Number(codigo);
};