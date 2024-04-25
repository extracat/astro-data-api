const app = require('./api/index');
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./index.json'); 

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
