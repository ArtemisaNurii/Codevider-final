import { execSync } from "node:child_process";
import { renameSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Route handlers cannot be statically exported — Pages Functions cover `/api/*`. */
const routeFiles = ["app/api/contact/route.ts", "app/api/career/route.ts"].map(
	(relative) => join(root, relative),
);

function hideRoutes() {
	for (const file of routeFiles) {
		if (existsSync(file)) {
			renameSync(file, `${file}.staticbak`);
		}
	}
}

function restoreRoutes() {
	for (const file of routeFiles) {
		const backup = `${file}.staticbak`;
		if (existsSync(backup)) {
			renameSync(backup, file);
		}
	}
}

hideRoutes();

try {
	execSync("next build", {
		stdio: "inherit",
		env: { ...process.env, STATIC_EXPORT: "1" },
		cwd: root,
	});
} finally {
	restoreRoutes();
}
