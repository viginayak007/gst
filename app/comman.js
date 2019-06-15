(() => {
    'use strict';
    const getKeyOfRequestedTypeOfObjectProperty = (obj, type) => {
        return obj.filter((f) => {
            switch(type) {
                case 'only_object':
                    return typeof(fileData[f] === 'object')  && !Array.isArray(fileData[f]);
                case 'only_array':
                    return  Array.isArray(fileData[f]);
                case 'only_string':
                    return typeof(fileData[f] === 'string');
                case 'only_number':
                        return typeof(fileData[f] === 'number');
                default:
                    return 1 === 1;
                }
        });
    }
})

