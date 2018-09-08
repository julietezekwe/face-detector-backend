import pool from '../db/config';

const HandleRegister = (req, res, bcrypt) => {
    const { name, email, password } = req.body;
    var hash = bcrypt.hashSync(password);
    const joined = new Date();
    const query = {
        text: 'INSERT INTO users(name, email, hash, joined) VALUES($1, $2, $3, $4) RETURNING *',
        values: [name, email, hash, joined],
      };
      pool.query(query).then(user =>{
              res.json(user.rows[0])
          }).catch(err => res.status(400).json(err.detail));
    
}

export { HandleRegister };