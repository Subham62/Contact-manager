export const notFound = (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
};

export const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    success: false,
    message: err.message
  });
};
