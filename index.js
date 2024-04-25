const app = require('./api/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./index.json');
const port = process.env.PORT || 3000;

// Swagger UI page
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
