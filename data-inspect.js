function inspect (data, options, parsedObjects = []) {
    options = {
        name: '',
        expanded: false,
        ... (options || {}),
        colors: {
            number: 'blue',
            string: 'firebrick',
            boolean: 'green',
            null: 'gray',
            undefined: 'gray',
            object: 'purple',
            array: 'pink',
            function: 'darkcyan',
            symbol: 'orange',
        }
    }
    let html = ''
    let type = typeof data
    html += '<div style="font-family: monospace; line-height: 20px">'
    switch (type) {
        case 'number':
        case 'string':
        case 'boolean': 
        case 'undefined': 
        case 'symbol': 
            if (type === 'string') data = '"' + data + '"'
            html += `<div><span><b style="color: darkblue">${options.name}</b>${options.name ? ':' : ''} </span><span style="color: ${options.colors[type]}">${type === 'undefined' ? type : data.toString()}</span></div>`     
            break             
        case 'function':
        case 'object': 
            if (data === null) {
                html += `<div><span><b style="color: darkblue">${options.name}</b>: </span><span style="color: ${options.colors.null}">${data}</span></div>` 
            } else {
                let defaultName = (() => {
                    if (type === 'function') return '(function)'
                    else if (Array.isArray(data)) return '(array)'
                    else return '(object)'
                })()
                let defaultValue = (() => {
                    if (type === 'function') return `${data.name}()`
                    else if (Array.isArray(data)) return `[${data.length}]`
                    else return data.toString()
                })()
                let colorName = (() => {
                    if (type === 'function') return 'function'
                    else if (Array.isArray(data)) return 'array'
                    else return 'object'
                })()
                html += `<details ${options.expanded && !(type === 'function') ? 'open' : ''}>`
                html += `<summary><span><b>${options.name || defaultName}</b>: </span><span style="color: ${options.colors[colorName]}">${defaultValue}</span></summary>`
                html += `<div style="margin-left: 3px; padding-left: 37px; border-left: dashed lightgray 1px;">`
                {
                    parsedObjects.push(data)
                    let keys = [
                        ... Object.getOwnPropertyNames(data),
                    ].sort()
                    for (let i in keys) {
                        let key = keys[i]
                        let value = data[key]
                        if (parsedObjects.find((el) => el === value)) {
                            html += `<div><span><b>${key}</b>: </span><span style="color: gray">(circular ref)</span></div>`   
                        } else {
                            try {
                                html += inspect(value, { name: key, expanded: options.expanded }, parsedObjects)
                            } catch (error) {}
                        }
                    }
                }
                html += `</div>`
                html += `</details>`
            }
            break
    }
    html += '</div>'
    return html
}

module.exports = inspect