import AdmZip from "adm-zip";
import fs from "node:fs";
import path from "node:path";

const pluginPackage = AdmZip();

// Add build output to plugin ZIP file.
fs.readdirSync("./build", {encoding: "utf-8", recursive: true})
	.filter(f => fs.lstatSync("./build/" + f).isFile())
	.forEach((file) => {
		const zipPath = path.dirname(file);
		const zipFileName = path.basename(file)
		console.debug(`Writing build/${file} => ${zipPath}/${zipFileName}`)
		pluginPackage.addLocalFile("./build/" + file, zipPath);
	});

// Add informational files to plugin ZIP file.
pluginPackage.addLocalFile("readMe.md");
pluginPackage.addLocalFile("license.md");


pluginPackage.writeZip("wp-content-consent-blocks.zip");
