/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("https");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const fs = __webpack_require__(2);
const path = __webpack_require__(3);
const cp = __webpack_require__(4);
const child_process_1 = __webpack_require__(4);
const os = __webpack_require__(5);
const https = __webpack_require__(6);
let defaultExtensionPath = '', cliPath = '', binaryFileName = '', downloadUrl = '';
const sampleName = 'sample.json';
const tempSampleName = 'tempSample.json';
const sampleOutputName = 'sample.out.json';
const tempSampleOutputName = 'tempSample.out.json';
const homeDir = os.homedir();
const documentsFolderPath = path.join(homeDir, 'Documents');
const dadroitFolderPath = path.join(documentsFolderPath, 'Dadroit JSON Generator');
const defaultResultPath = dadroitFolderPath;
const samplePath = path.join(dadroitFolderPath, sampleName);
const generatedFilePath = path.join(dadroitFolderPath, sampleOutputName);
const tempGeneratedFilePath = path.join(dadroitFolderPath, tempSampleOutputName);
const tempSamplePath = path.join(dadroitFolderPath, tempSampleName);
function fileExists(filePath) {
    try {
        return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to check file exist: "${error}"`);
        return false;
    }
}
async function openFileInEditor(filePath) {
    try {
        const fileUri = vscode.Uri.file(path.resolve(filePath));
        const document = await vscode.workspace.openTextDocument(fileUri);
        await vscode.window.showTextDocument(document, { preview: false });
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to open file: "${error}"`);
    }
}
function openFolderInExplorer(folderPath) {
    try {
        const absolutePath = path.resolve(folderPath);
        switch (os.platform()) {
            case 'win32':
                (0, child_process_1.exec)(`explorer "${absolutePath}"`);
                break;
            case 'darwin':
                (0, child_process_1.exec)(`open "${absolutePath}"`);
                break;
            case 'linux':
                (0, child_process_1.exec)(`xdg-open "${absolutePath}"`);
                break;
            default:
                throw new Error(`Unsupported platform: ${os.platform()}`);
        }
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to open folder: ${error}`);
    }
}
function ensureExistenceDefaultFolder() {
    try {
        if (!directoryExists(dadroitFolderPath)) {
            fs.mkdirSync(dadroitFolderPath, { recursive: true });
        }
        return dadroitFolderPath;
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error in default folder exist: ${error}`);
    }
}
//Copy the default sample into the output folder 
function copyIfNotExist(srcPath, destFolderPath, destFileName) {
    try {
        const absoluteSrcPath = path.join(srcPath, destFileName);
        const absoluteDestFolderPath = path.resolve(destFolderPath);
        const absoluteDestPath = path.join(absoluteDestFolderPath, destFileName);
        if (!directoryExists(absoluteDestFolderPath)) {
            fs.mkdirSync(absoluteDestFolderPath, { recursive: true });
        }
        if (!fileExists(absoluteDestPath)) {
            const srcContent = fs.readFileSync(absoluteSrcPath, 'utf-8');
            fs.writeFileSync(absoluteDestPath, srcContent, 'utf-8');
            fs.chmodSync(absoluteDestPath, 0o444);
        }
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to copy sample file: ${error}`);
    }
}
function deleteFile(filePath) {
    try {
        const absoluteFilePath = path.resolve(filePath);
        if (fileExists(absoluteFilePath)) {
            fs.unlinkSync(absoluteFilePath);
        }
    }
    catch (error) {
        vscode.window.showInformationMessage(`Failed to delete temp file: ${error}`);
    }
}
function directoryExists(directoryPath) {
    try {
        return fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory();
    }
    catch (error) {
        vscode.window.showInformationMessage(`Failed to check directory exists: ${error}`);
        return false;
    }
}
async function spawnChildProcess(args, isSampleCommand) {
    try {
        await ensureCliAndReport(cliPath);
        let resultPath = '';
        if (isSampleCommand) {
            resultPath = generatedFilePath;
        }
        else {
            resultPath = tempGeneratedFilePath;
        }
        const child = cp.spawn(cliPath, args);
        child.stderr.on('data', (data) => {
            vscode.window.showErrorMessage(`Error in spawnChildProcess; stderr: ${data}`);
        });
        child.on('error', (err) => {
            vscode.window.showErrorMessage(`spawnChildProcess; Failed to start subprocess: ${err}`);
        });
        child.on('close', (code) => {
            let caption = 'Your result file is ready.';
            //Open the default sample which based on it the json was generated in the editor 
            if (isSampleCommand) {
                openFileInEditor(samplePath);
            }
            // Delete temp sample file generated on the fly 
            else {
                deleteFile(tempSamplePath);
            }
            vscode.window.showInformationMessage(caption, 'Open File in VSCode', 'Open File in Explorer').then(selection => {
                if (selection === 'Open File in VSCode') {
                    openFileInEditor(resultPath);
                }
                else if (selection === 'Open File in Explorer') {
                    openFolderInExplorer(defaultResultPath);
                }
            });
        });
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error execute the command: ${error}`);
    }
}
async function downloadBinary(url, destination) {
    return new Promise((resolve, reject) => {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Downloading CLI application...',
            cancellable: false
        }, async (progress) => {
            try {
                const downloadHelper = (currentUrl) => {
                    https.get(currentUrl, (response) => {
                        if (response.statusCode === 302 || response.statusCode === 301) {
                            const newUrl = response.headers['location'];
                            if (typeof newUrl === 'string') {
                                downloadHelper(newUrl);
                            }
                            else {
                                reject(new Error('Location header is missing in the HTTP redirect response.'));
                            }
                            return;
                        }
                        if (response.statusCode !== 200) {
                            reject(new Error(`Failed to download CLI. HTTP Status Code: ${response.statusCode}`));
                            return;
                        }
                        const totalBytes = parseInt(response.headers['content-length'] || '0', 10);
                        let receivedBytes = 0;
                        const fn = path.join(destination, binaryFileName);
                        const fileStream = fs.createWriteStream(fn);
                        response.pipe(fileStream);
                        response.on('data', chunk => {
                            receivedBytes += chunk.length;
                            const percentage = Math.round((receivedBytes / totalBytes) * 100);
                            progress.report({ increment: percentage });
                        });
                        fileStream.on('finish', () => {
                            fileStream.close();
                            if (os.platform() === 'darwin' || os.platform() === 'linux') {
                                fs.chmodSync(fn, 0o755);
                            }
                            resolve();
                        });
                        fileStream.on('error', (err) => {
                            fs.unlink(fn, () => reject(err));
                        });
                    }).on('error', (err) => reject(err));
                };
                downloadHelper(url);
            }
            catch (error) {
                reject(error);
                vscode.window.showErrorMessage(`Error downloading CLI app: ${error}`);
            }
        });
    });
}
async function spawnChildInstall() {
    try {
        cp.spawn(cliPath, ['Install']);
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error execute the command: ${error}`);
    }
}
async function ensureCliExists(cliPathParam) {
    try {
        if (fileExists(cliPathParam)) {
            return true;
        }
        // Ensure directory exists
        const cliDir = path.dirname(cliPathParam);
        if (!fs.existsSync(cliDir)) {
            fs.mkdirSync(cliDir, { recursive: true });
        }
        await downloadBinary(downloadUrl, cliDir);
        spawnChildInstall();
        return true;
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error CLI app exists: ${error}`);
        return false;
    }
}
//Main entry function to initialize check for binary file then start download etc.
async function ensureCliAndReport(cliPathParam) {
    try {
        const cliExists = await ensureCliExists(cliPathParam);
        if (!cliExists) {
            vscode.window.showErrorMessage(`Failed to ensure CLI exists: ${cliPathParam}`);
            return false;
        }
        return true;
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error CLI app exists: ${error}`);
        return false;
    }
}
function setAddressesBasedOnOS() {
    try {
        binaryFileName = '';
        switch (os.platform()) {
            case 'win32':
                binaryFileName = 'JSONGeneratorCLI.exe';
                downloadUrl = 'https://dadroit.com/releases/win/JSONGeneratorCLI.exe';
                break;
            case 'darwin':
                binaryFileName = 'JSONGeneratorCLI';
                downloadUrl = 'https://dadroit.com/releases/mac/JSONGeneratorCLI';
                break;
            case 'linux':
                binaryFileName = 'JSONGeneratorCLI';
                downloadUrl = 'https://dadroit.com/releases/lnx/JSONGeneratorCLI';
                break;
            default:
                vscode.window.showErrorMessage('This OS is not supported!');
        }
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error getBinaryFileName: ${error}`);
    }
}
//First initialization of the app 
async function initializeEnvironment(context) {
    try {
        setAddressesBasedOnOS();
        if (binaryFileName !== '') {
            defaultExtensionPath = path.join(context.extensionPath, 'cli');
            cliPath = path.join(defaultExtensionPath, binaryFileName);
            ensureExistenceDefaultFolder();
            copyIfNotExist(defaultExtensionPath, defaultResultPath, sampleName);
            if (!fileExists(samplePath)) {
                vscode.window.showErrorMessage(`Sample file not exist: ${samplePath}`);
            }
        }
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error initializing: ${error}`);
    }
}
//Helper to register all the commands which would be called once during activation process  
async function registerCommands(context) {
    try {
        //the default sample command 
        let disposable = vscode.commands.registerCommand('Generate JSON Sample', async () => {
            copyIfNotExist(cliPath, defaultResultPath, sampleName);
            await spawnChildProcess([samplePath], true);
        });
        //The command to generate json from the opened editor file 
        let disposableTemp = vscode.commands.registerCommand('Generate JSON', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active text editor found.');
                return;
            }
            // Check if directory exists
            const tempSampleDir = path.dirname(tempSamplePath);
            if (!directoryExists(tempSampleDir)) {
                vscode.window.showErrorMessage('Directory does not exist.');
                return;
            }
            const document = editor.document;
            const fileContent = document.getText();
            fs.writeFileSync(tempSamplePath, fileContent, 'utf-8');
            await spawnChildProcess([tempSamplePath], false);
        });
        // Register disposables
        context.subscriptions.push(disposableTemp);
        context.subscriptions.push(disposable);
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error registering command: ${error}`);
    }
}
//This is the entry point of the app
async function activate(context) {
    try {
        await initializeEnvironment(context);
        await ensureCliAndReport(cliPath);
        await registerCommands(context);
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error activate: ${error}`);
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map