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
