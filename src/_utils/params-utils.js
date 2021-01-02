export function build(params, prop, value) {
    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()
    parameters.set(prop, value ?? '')
    const url = Array.from(parameters)
        .filter(e => e[1] && `${e[1]}`.length > 0)
        .map(e => e.join('='))
        .join(';')
    return url !== '' ? `${url}/` : ''
}

export function buildLink(params, categoryId, filter, item) {
    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()
    let array = parameters.get(filter.name) ? parameters.get(filter.name).split(',').map(e => parseInt(e)) : []
    if (item.products_quantity === '0' && !array.includes(item.id)) return { to: '#'}
    if (array.includes(item.id)) {
        array = array.filter(e => e !== item.id)
    } else {
        array = [...array, item.id]
    }
    parameters.set(filter.name, array.sort())
    parameters.set('page', null)
    const url = Array.from(parameters)
        .filter(e => e[1] && `${e[1]}`.length > 0)
        .map(e => e.join('='))
        .join(';')
    return { to: `/${categoryId ? `catalog/${categoryId}` : 'search'}/${url !== '' ? `${url}/` : ''}`}
}

export function buildLinkRange(params, categoryId, filter) {
    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()
    parameters.set(filter.name, null)
    parameters.set('page', null)
    const url = Array.from(parameters)
        .filter(e => e[1] && `${e[1]}`.length > 0)
        .map(e => e.join('='))
        .join(';')
    return { to: `/${categoryId ? `catalog/${categoryId}` : 'search'}/${url !== '' ? `${url}/` : ''}`}
}
