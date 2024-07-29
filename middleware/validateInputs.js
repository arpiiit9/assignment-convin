export const validateExpenseInput = (req, res, next) => {
    const { description, totalAmount, friends } = req.body;
  
    if (!description || !totalAmount || !friends || !Array.isArray(friends) || friends.length === 0) {
      return res.status(400).json({ error: 'Invalid input' });
    }
  
    next();
  };
  
  export const validateUserInput = (req, res, next) => {
    const { name, email, mobile } = req.body;
  
    if (!name || !email || !mobile) {
      return res.status(400).json({ error: 'Invalid input' });
    }
  
    next();
  };
  