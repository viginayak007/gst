const gst_transform = (JsonData) => {
    JsonData = JSON.parse(JSON.stringify(JsonData))
    let header = [];

    var o = 0;
    var a = 0;

    const getheader = (data) => {
        if(typeof(data) === 'object'){
            if(Array.isArray(data)){
                data.forEach(i => {
                    getheader(i);
                })
            }else{
                if(data){
                    Object.keys(data).forEach(i => {
                        if(typeof(data[i]) === 'object'){
                            getheader(data[i]); 
                        }else{
                            if(!header.includes(i)){
                                header.push(i);
                            }        
                        }
                    });
                }
            }
        }else{
            if(data){
                if(!header.includes(data)){
                    header.push(data);
                }
            }
        }
    }

   
    const getData = (data) => {
        if(typeof(data) === 'object'){
            var obj = {};
            
            if(Array.isArray(data)){
                data.forEach(i => {
                    getheader(i);
                })
            }else{
                if(data){
                    var anyArrayExists = 0;
                    
                    Object.keys(data).forEach(i => {
                        if(typeof(data[i]) === 'object'){
                            getheader(data[i]); 
                        }else{
                            obj[i] = data[i];        
                        }
                    });
                }
            }
        }
    }
    

    getheader(JsonData);
    getData(SON.stringify(header));
    console.log( );
    // console.log( JSON.stringify(header));
    
    return 'success';
};
module.exports = gst_transform;