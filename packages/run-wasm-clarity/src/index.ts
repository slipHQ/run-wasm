import init, { handle_command, init_session, InitInput } from 'clarity-repl'

export class ClarityClient {
  private readonly initInput: InitInput | undefined = undefined

  private readonly initCode: string = ''

  /**
   * Create a new instance of the Clarity Client
   * @param clarityInit Clarity initialiser, eg. a URL to clarity WASM
   * @param initCode  Initialisation code to run before each code run
   */
  public constructor(clarityInit: InitInput, initCode: string) {
    this.initInput = clarityInit
    this.initCode = initCode
  }

  /**
   * Initialise a new Clarity REPL session
   */
  public async initialise(): Promise<void> {
    await init(this.initInput)
    await init_session('')
  }

  /**
   * Run the given Clarity Code, returning the result
   * @param code Code to run
   * @returns The response from the Clarity REPL
   */
  public async run(code: string): Promise<string> {
    handle_command(this.initCode)
    return handle_command(code)
  }
}

const createClarityClient = (
  clarityInit: InitInput,
  initCode: string
): ClarityClient => {
  return new ClarityClient(clarityInit, initCode)
}

export { createClarityClient }
