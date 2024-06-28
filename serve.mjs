// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import compression from "compression";
// import morgan from "morgan";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Log environment variables to debug on Heroku
// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log(
//   "VITE_API_BASE_URL_DESKTOP:",
//   process.env.VITE_API_BASE_URL_DESKTOP,
// );
// console.log("VITE_API_BASE_URL_MOBILE:", process.env.VITE_API_BASE_URL_MOBILE);
// console.log("MONGO_COLLECTION_NAME:", process.env.MONGO_COLLECTION_NAME);
// console.log("VITE_USE_HTTPS:", process.env.VITE_USE_HTTPS);
// console.log("VITE_PUBLIC_URL:", process.env.VITE_PUBLIC_URL);

// // Define static files location; typically, this would be where your built frontend resides
// const publicPath = resolve("dist");

// // Use helmet for security
// app.use(helmet());

// // Use compression for gzip compression
// app.use(compression());

// // Use morgan for logging
// app.use(morgan("combined"));

// // Serve static files
// app.use(express.static(publicPath));

// // Serve index.html on all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start HTTP server
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

///////////////////

import express from "express";
import { createServer } from "http";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// Define static files location; typically, this would be where your built frontend resides
const publicPath = resolve("dist");

// Serve static files
app.use(express.static(publicPath));

//test
app.get("/test", (req, res) => {
  res.send("API is working!");
});

//butterfly
app.get("/butterfly", (req, res) => {
  res.send("butterfly is working!");
});

app.get("/api/dog", (req, res) => {
  res.json({ message: "Woof!" });
});

// Serve index.html on all other routes to support client-side routing
app.get("/", (req, res) => {
  res.sendFile(resolve(publicPath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start HTTP server
createServer(app).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

///////////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Define static files location; typically, this would be where your built frontend reside
// const publicPath = resolve("dist");

// // Serve static files
// app.use(express.static(publicPath));

// // Serve index.html on all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// // Start HTTP server
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

///////////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Define static files location; typically, this would be where your built frontend reside
// const publicPath = resolve("dist");

// // Serve static files
// app.use(express.static(publicPath));

// // Serve index.html on all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// // Start HTTP server
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

/////////////////////
///

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Define static files location; typically, this would be where your built frontend resides
// const publicPath = resolve("dist");

// // Serve static files
// app.use(express.static(publicPath));

// // Serve index.html on all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// // Start HTTP server
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

/////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

///////////////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

////////////

// import express from "express";
// import { readFileSync, existsSync } from "fs";
// import { resolve } from "path";
// import { createServer as createHttpServer } from "http";
// import { createServer as createHttpsServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// const app = express();

// let server;
// if (keyPath && certPath && existsSync(keyPath) && existsSync(certPath)) {
//   const options = {
//     key: readFileSync(resolve(keyPath)),
//     cert: readFileSync(resolve(certPath)),
//   };
//   server = createHttpsServer(options, app);
//   console.log("Starting server with HTTPS...");
// } else {
//   server = createHttpServer(app);
//   console.log("Starting server with HTTP...");
// }

// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// server.listen(port, () => {
//   console.log(
//     `Server is running on ${server instanceof HttpsServer ? "https" : "http"}://localhost:${port}`,
//   );
// });

/////////////

// import express from "express";
// import { readFileSync, existsSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// const app = express();
// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// if (keyPath && certPath && existsSync(keyPath) && existsSync(certPath)) {
//   const options = {
//     key: readFileSync(resolve(keyPath)),
//     cert: readFileSync(resolve(certPath)),
//   };

//   createServer(options, app).listen(port, () => {
//     console.log(`Server is running on https://localhost:${port}`);
//   });
// } else {
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// }

//////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   console.log("SSL key or certificate not found, using HTTP instead of HTTPS");
// }

// const app = express();
// const options =
//   keyPath && certPath
//     ? {
//         key: readFileSync(resolve(keyPath)),
//         cert: readFileSync(resolve(certPath)),
//       }
//     : null;

// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// if (options) {
//   createServer(options, app).listen(port, () => {
//     console.log(`Server is running on https://localhost:${port}`);
//   });
// } else {
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// }

////////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import http from "http";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// const app = express();
// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// if (keyPath && certPath) {
//   const options = {
//     key: readFileSync(resolve(keyPath)),
//     cert: readFileSync(resolve(certPath)),
//   };
//   createServer(options, app).listen(port, "0.0.0.0", () => {
//     console.log(`Server is running on https://localhost:${port}`);
//   });
// } else {
//   http.createServer(app).listen(port, "0.0.0.0", () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// }

/////////////////////////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });
