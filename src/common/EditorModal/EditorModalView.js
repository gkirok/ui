import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import Editor from '@monaco-editor/react'
import { Base64 } from 'js-base64'

import Button from '../Button/Button'

import './editorModal.scss'

const EditorModalView = ({ closeModal, data, handleSaveCode, setData }) =>
  createPortal(
    <div className="editor-modal-container">
      <div className="editor-modal">
        <div className="editor-modal__header">
          <Button label="Cancel" onClick={closeModal} variant="tertiary" />
          <Button
            label="Save"
            onClick={() => handleSaveCode(Base64.encode(data))}
            variant="secondary"
          />
        </div>
        <Editor
          className="editor-modal__body"
          defaultLanguage="python"
          defaultValue={data}
          onChange={value => setData(value)}
        />
      </div>
    </div>,
    document.getElementById('root')
  )

EditorModalView.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
  handleSaveCode: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired
}

export default EditorModalView
