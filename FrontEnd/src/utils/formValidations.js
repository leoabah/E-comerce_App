

export const validations = {
    name:{
        require: true,
        pattern:
        /^[A-Za-zÀ-ÿ\s]{3,40}$/,
        mensaje: 
        "el nombre debe tener entre 3 y 40 caracteres"
    },
    price:{
        require: true,
        pattern: 
        /^[1-9][0-9]*$/,
        mensaje: 
        "solo numero positivos"
    },
    age: {
        require: true,
        pattern:
        /^[0-9]{1,2}$/,
        mensaje:
        "Edad invalida"
    },
    shortDescription:{
        require: true ,
        pattern:
        /^.{10,100}$/,
        mensaje:
        "Minimo 10 caracteres"
    },
    longDescription:{
        require:true,
        pattern: 
        /^.{20,500}$/,
        mensaje:
        "Minimo 20 caracteres"
    }

};

