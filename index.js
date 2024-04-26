const app = require('./api/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./index.json');
const port = process.env.PORT || 3000;
const path = require('path');

// Swagger UI page
app.use(express.static(path.join(__dirname, 'public')))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
