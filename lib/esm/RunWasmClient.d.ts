export declare class RunWasmClient {
  protected language: string
  constructor(language: string)
  run({ input }: { input: string }): Promise<string>
}
