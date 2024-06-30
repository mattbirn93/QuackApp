import express from "express";
import { createServer } from "http";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`);
  next();
});

// API routes
app.get("/test", (req, res) => {
  res.send("API is working!");
});

app.get("/butterfly", (req, res) => {
  res.send("butterfly is working!");
});

app.get("/api/dog", (req, res) => {
  res.json({ message: "Woof!" });
});

app.get("/food", (req, res) => {
  res.json({ message: "food route is working" });
});

// Serve static files
const publicPath = resolve("dist");
app.use(express.static(publicPath));

// Catch-all route to serve index.html (must be placed after all sother routes)
app.get("*", (req, res) => {
  const indexPath = resolve(publicPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send(err);
    }
  });
});

// Error handling middlewares
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start HTTP servers
createServer(app).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//////////////////////////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.path}`);
//   next();
// });

// // API routes
// app.get("/test", (req, res) => {
//   res.send("API is working!");
// });

// app.get("/butterfly", (req, res) => {
//   res.send("butterfly is working!");
// });

// app.get("/api/dog", (req, res) => {
//   res.json({ message: "Woof!" });
// });

// app.get("/food", (req, res) => {
//   res.json({ message: "food route is working" });
// });

// // Serve static files
// const publicPath = resolve("dist");
// app.use(express.static(publicPath));

// // Catch-all route to serve index.html (must be placed after all other routes)
// app.get("*", (req, res) => {
//   const indexPath = resolve(publicPath, "index.html");
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send(err);
//     }
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start HTTP servers
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
