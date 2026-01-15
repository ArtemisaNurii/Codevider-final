import fs from "fs";
import packageJson from "./package.json" with { type: "json" };

const appVersion = packageJson.version;

const jsonData = {
	version: appVersion,
};

const jsonContent = JSON.stringify(jsonData);

console.log(jsonContent);

fs.writeFile("./public/meta.json", jsonContent, "utf8", (err) => {
	if (err) {
		console.log("An error occured while writing JSON Object to meta.json");
		return console.log(err);
	}
	console.log("meta.json file has been saved with latest version number");
});
