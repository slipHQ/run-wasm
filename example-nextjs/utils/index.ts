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

export interface CustomKeyBinding {
  label: string
  keybinding: any
  callback: () => void
  editorRef: any
}

export const addKeyBinding = ({
  label,
  keybinding,
  callback,
  editorRef,
}: CustomKeyBinding) => {
  editorRef?.current?.addAction({
    id: 'label',
    label,
    keybindings: [keybinding],
    precondition:
      '!suggestWidgetVisible && !markersNavigationVisible && !findWidgetVisible',
    run: callback,
  })
}
