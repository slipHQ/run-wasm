//the argument types here needs to be fixed.
export const runMethodOnCtrlEnterOrCmdEnterKeyPress = (
  e: any,
  methodToRun: any
): void => {
  const ctrlEnter = e.code === 'Enter' && e.ctrlKey
  const cmdEnter = e.code === 'Enter' && e.metaKey
  if (ctrlEnter || cmdEnter) {
    methodToRun()
  }
}
