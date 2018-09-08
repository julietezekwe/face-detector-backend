import pool from '../db/config';

const HandleSignin = (req, res, bcrypt) => {
    const { email, password } = req.body; 
    let query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values:[email]
    }
    pool.query(query).then(data => {
       if(data.rows.length > 0){
           const user = {
               id:data.rows[0].id,
               name:data.rows[0].name,
               email:data.rows[0].email,
               entries:data.rows[0].entries,
               joined:data.rows[0].joined
           }
           bcrypt.compareSync(password, data.rows[0].hash) ? res.json(user)
          : res.status(401).json("wrong credentials");
       } 
       else res.status(401).json("user does not exist");
    });

    
   
}

export { HandleSignin
}