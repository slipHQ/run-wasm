export declare class RunWasmClient {
    protected language: string;
    constructor(language: string);
    run({ input }: {
        input: string;
    }): Promise<string>;
}
export declare class PythonClient {
    protected pyodide: any;
    constructor(pyodide: any);
    run({ code }: {
        code: string;
    }): Promise<string>;
}
