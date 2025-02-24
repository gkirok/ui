import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import PopUpDialog from '../../common/PopUpDialog/PopUpDialog'
import RegisterArtifactForm from '../../elements/RegisterArtifactForm/RegisterArtifactForm'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import Button from '../../common/Button/Button'

import { v4 as uuidv4 } from 'uuid'

import artifactApi from '../../api/artifacts-api'

const RegisterArtifactPopup = ({
  artifactFilter,
  artifactKind,
  match,
  refresh,
  setIsPopupOpen,
  title
}) => {
  const [registerArtifactData, setRegisterArtifactData] = useState({
    description: {
      value: '',
      required: false
    },
    kind: { value: 'general', required: false },
    key: {
      value: '',
      required: false
    },
    target_path: {
      value: '',
      required: false
    },
    error: {
      message: ''
    }
  })

  useEffect(() => {
    if (artifactKind !== 'file') {
      setRegisterArtifactData(state => ({
        ...state,
        kind: {
          ...state.kind,
          value: artifactKind.toLowerCase()
        }
      }))
    }
  }, [artifactKind])

  const resetRegisterArtifactForm = useCallback(() => {
    setRegisterArtifactData({
      description: {
        value: '',
        required: false
      },
      kind: { value: 'general', required: false },
      key: {
        value: '',
        required: false
      },
      target_path: {
        value: '',
        required: false
      },
      error: {
        message: ''
      }
    })
  }, [])

  const registerArtifact = useCallback(() => {
    if (
      !registerArtifactData.key.value ||
      !registerArtifactData.target_path.value
    ) {
      return setRegisterArtifactData(prevData => ({
        ...prevData,
        key: {
          ...prevData.key,
          required: !registerArtifactData.key.value
        },
        target_path: {
          ...prevData.target_path,
          required: !registerArtifactData.target_path.value
        }
      }))
    }

    if (registerArtifactData.error.message) {
      setRegisterArtifactData(prevData => ({
        ...prevData,
        error: { ...prevData.error, message: '' }
      }))
    }

    const uid = uuidv4()
    const data = {
      uid: uid,
      key: registerArtifactData.key.value,
      db_key: registerArtifactData.key.value,
      tree: uid,
      target_path: registerArtifactData.target_path.value,
      description: registerArtifactData.description.value,
      kind:
        registerArtifactData.kind.value === 'general'
          ? ''
          : registerArtifactData.kind.value,
      project: match.params.projectName,
      producer: {
        kind: 'api',
        uri: window.location.host
      }
    }

    if (registerArtifactData.kind.value === 'model') {
      const {
        target_path,
        model_file
      } = registerArtifactData.target_path.value.match(
        /^(?:(?<target_path>.+\/))?(?<model_file>.+)$/
      )?.groups

      data.target_path = target_path
      data.model_file = model_file
    }

    artifactApi
      .registerArtifact(match.params.projectName, data)
      .then(() => {
        resetRegisterArtifactForm()
        setIsPopupOpen(false)
        refresh({
          tag: artifactFilter.tag,
          labels: artifactFilter.labels,
          name: artifactFilter.name
        })
      })
      .catch(err => {
        setRegisterArtifactData(prevData => ({
          ...prevData,
          error: {
            ...prevData.error,
            message: err.message
          }
        }))
      })
  }, [
    artifactFilter,
    match.params.projectName,
    refresh,
    registerArtifactData,
    resetRegisterArtifactForm,
    setIsPopupOpen
  ])

  const closePopupDialog = useCallback(() => {
    setIsPopupOpen(false)
    resetRegisterArtifactForm()
  }, [resetRegisterArtifactForm, setIsPopupOpen])

  const closeErrorMessage = useCallback(() => {
    setRegisterArtifactData(prevData => ({
      ...prevData,
      error: {
        ...prevData.error,
        message: ''
      }
    }))
  }, [])

  return (
    <PopUpDialog
      data-testid="register-artifact"
      headerText={title}
      closePopUp={closePopupDialog}
    >
      <RegisterArtifactForm
        registerArtifactData={registerArtifactData}
        onChange={setRegisterArtifactData}
        showType={artifactKind === 'file'}
      />
      <div className="pop-up-dialog__footer-container">
        {registerArtifactData.error.message && (
          <ErrorMessage
            closeError={closeErrorMessage}
            message={registerArtifactData.error.message}
          />
        )}
        <Button
          variant="tertiary"
          label="Cancel"
          className="pop-up-dialog__btn_cancel"
          onClick={closePopupDialog}
        />
        <Button variant="primary" label="Register" onClick={registerArtifact} />
      </div>
    </PopUpDialog>
  )
}

RegisterArtifactPopup.defaultProps = {
  title: ''
}

RegisterArtifactPopup.propTypes = {
  artifactFilter: PropTypes.shape({}).isRequired,
  artifactKind: PropTypes.string.isRequired,
  match: PropTypes.shape({}).isRequired,
  refresh: PropTypes.func.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default RegisterArtifactPopup
