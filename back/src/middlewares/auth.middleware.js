const jwt = require('jsonwebtoken');

/**
 * Authentication middleware
 * 
 * Verify the authenticity of the token sent by the user
 */
module.exports = {


  /**
   * checks if the user can get other users 
   */
  getUserBody (req, res, next) {
    if (req.headers.authorization === undefined) {
      res.status(401).json({ message: "no authorization token found" });
    } else {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken.userId;
        if (req.body.id && req.body.id != userId) {
          throw 'Invalid user ID';
        } else {
          req.user_id = userId;
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    }
  },

  getUserParams (req, res, next) {
    if (req.headers.authorization === undefined) {
      res.status(401).json({ message: "no authorization token found" });
    } else {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken.userId;
        if (req.params.id && req.params.id != userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    }
  },


  /**
   * checks if the user can interact with the likes
   */
  like (req, res, next) {
    if (req.headers.authorization === undefined) {
      res.status(401).json({ message: "no authorization token found" });
    } else {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken.userId;
  
        if (req.params.liker_id && req.params.liker_id != userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch (error) {
        console.error(error);
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    }
  },

  /**
   * checks if the user can interact with the matches
   */
   match (req, res, next) {

    if (req.headers.authorization === undefined) {
      res.status(401).json({ message: "no authorization token found" });
    } else {
      try {
      
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken.userId;
  
        if (req.params.id && req.params.id != userId && req.params.user_id && req.params.user_id != userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch (error) {
        console.error(error);
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    }
  },

  /**
   * checks if the user can interact with its blocked users
   */
   block (req, res, next) {

    if (req.headers.authorization === undefined) {
      res.status(401).json({ message: "no authorization token found" });
    } else {
      try {
      
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken.userId;
  
        if (req.params.blocker_id && req.params.blocker_id != userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch (error) {
        console.error(error);
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    }
  }
    
};