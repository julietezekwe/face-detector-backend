import pool from '../db/config';

const HandleImage = (req, res) => {
    const { id } = req.body;
    let query = {
     text: 'SELECT * FROM users WHERE id = $1',
         values: [id],
     }
     pool.query(query).then(user => { 
        
             const entries = Number(user.rows[0].entries) + 1;
             let updateQuery = {
                 text: 'UPDATE users SET entries = $1   WHERE id = $2 RETURNING entries',
                 values: [entries , id],
             }
             pool.query(updateQuery);
      
             res.json(entries); 
            
              
 });
      
 
 }


 export { HandleImage };