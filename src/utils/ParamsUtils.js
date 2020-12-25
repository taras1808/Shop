export function build(params, prop, value) {
    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()
    parameters.set(prop, value ?? '')
    const url = Array.from(parameters)
        .filter(e => `${e[1]}`.length > 0)
        .map(e => e.join('='))
        .join(';')
    return url !== '' ? `${url}/` : ''
}
