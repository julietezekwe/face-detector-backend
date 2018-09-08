import pool from '../db/config';

const HandleProfileGet = (req, res) => {
    const { id } = req.params;
    let query = {
     text: 'SELECT * FROM users WHERE id = $1',
     values: [id],
 }
 pool.query(query).then(user => {
      user.rows.length > 0 ? res.json(user.rows[0]) : res.status(400).json("user not found")
 });
      
 }

 export default HandleProfileGet;