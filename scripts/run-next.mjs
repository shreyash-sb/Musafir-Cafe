import net from "node:net";
import { spawn } from "node:child_process";

const mode = process.argv[2] || "dev";
const startPort = Number(process.env.PORT || 4500);
const maxPort = startPort + 20;

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port);
  });
}

async function findPort() {
  for (let port = startPort; port <= maxPort; port += 1) {
    if (await isPortFree(port)) return port;
  }
  throw new Error(`No free port found from ${startPort} to ${maxPort}`);
}

const port = await findPort();

if (port !== startPort) {
  console.log(`Port ${startPort} is busy. Using port ${port} instead.`);
}

console.log(`☕ Musafir Cafe & Roastery running at http://localhost:${port}`);

const command = process.platform === "win32" ? "node_modules\\.bin\\next.cmd" : "node_modules/.bin/next";
const child = spawn(command, [mode, "-p", String(port)], {
  stdio: "inherit",
  shell: process.platform === "win32"
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
