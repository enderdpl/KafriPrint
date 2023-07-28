// se hace esto para validar el esquema de forma global por que si no tuvieramos que colocar  lo que se hizo en ../sqchema/aut.schema.js en cada una de las rutas y de esta forma se recibe por parametro estos esquema y se valida con el metodo parse
export const validateSchema=  (schema)=> (req,res, next) =>{
    try {
        schema.parse(req.body)
        next()
        
    } catch (error) {
        // de esta forma devuelva un objeto muy grende cuando se presenta error asi que se hacer de esta otra forma
        // return res.status(400).json({error})
        // y con esto solo muestra el message del error
        // console.log(error.errors)
        return res.status(400).json(error.errors.map(error=> error.message))
    }
}