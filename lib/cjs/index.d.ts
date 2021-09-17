/// <reference types="react" />
import { RunWasmClient, PythonClient } from './RunWasmClient';
declare global {
    interface Window {
        pyodide: any;
        languagePluginLoader: any;
    }
}
declare function RunWasm({ language, code, }: {
    language: string;
    code: string;
}): JSX.Element;
declare const createRunWasmClient: (language: string) => RunWasmClient;
declare const createPythonClient: (pyodide: string) => PythonClient;
export { RunWasm, createRunWasmClient, createPythonClient };
