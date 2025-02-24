import actionMenu from '../components/action-menu.component'
import commonTable from '../components/table.component'
const { By } = require('selenium-webdriver')

// TO DO: that is dublicate from Feature Store PO. In feuture that should be fixed
const actionMenuStructure = {
  root: 'div.table__item div.item-header__buttons>div.actions-menu__container',
  menuElements: {
    open_button: 'div.data-ellipsis button',
    options: 'div.actions-menu__body div.actions-menu__option'
  }
}

const infoPaneTabSelector = {
  root: 'div.table__item ul.item-menu',
  header: {},
  body: {
    row: {
      root: 'a',
      fields: {
        tab: 'li.menu-tab'
      }
    }
  }
}

// Features Info Pane Table
const featuresInfoPaneTable = {
  root: 'div.table__item div.artifact-metadata div.artifact-metadata__table',
  header: {
    root: 'div.artifact-metadata__table-header',
    sorters: {
      icon: 'div.metadata-cell_icon div.data-ellipsis',
      name: 'div.metadata-cell_name div.data-ellipsis',
      type: 'div.metadata-cell_type div.data-ellipsis',
      description: 'div.metadata-cell_description div.data-ellipsis',
      labels: 'div.metadata-cell_labels div.data-ellipsis',
      validators: 'div.metadata-cell_validators div.data-ellipsis'
    }
  },
  body: {
    root: 'div.artifact-metadata__table-body',
    row: {
      root: 'div.artifact-metadata__table-row',
      fields: {
        icon: 'div.metadata-cell_icon div.data-ellipsis svg',
        name: 'div.metadata-cell_name div.data-ellipsis',
        type: 'div.metadata-cell_type div.data-ellipsis',
        description: 'div.metadata-cell_description div.data-ellipsis',
        labels: 'div.metadata-cell_labels div.data-ellipsis',
        validators: 'div.metadata-cell_validators div.data-ellipsis'
      }
    }
  }
}

// preview Info Pane Table
const previewInfoPaneTable = {
  root: 'div.table__item div.preview_container div.artifact-preview__table',
  header: {
    root: 'div.artifact-preview__table-header',
    sorters: {
      department:
        'div.artifact-preview__table-content:nth-of-type(1) div.data-ellipsis',
      parent_id:
        'div.artifact-preview__table-content:nth-of-type(2) div.data-ellipsis',
      room:
        'div.artifact-preview__table-content:nth-of-type(3) div.data-ellipsis',
      bad:
        'div.artifact-preview__table-content:nth-of-type(4) div.data-ellipsis',
      gender:
        'div.artifact-preview__table-content:nth-of-type(5) div.data-ellipsis',
      age:
        'div.artifact-preview__table-content:nth-of-type(6) div.data-ellipsis'
    }
  },
  body: {
    root: 'div.artifact-preview__table-body',
    row: {
      root: 'div.artifact-preview__table-row',
      fields: {
        department: 'div.data-ellipsis:nth-of-type(1)',
        parent_id: 'div.data-ellipsis:nth-of-type(2)',
        room: 'div.data-ellipsis:nth-of-type(3)',
        bad: 'div.data-ellipsis:nth-of-type(4)',
        gender: 'div.data-ellipsis:nth-of-type(5)',
        age: 'div.data-ellipsis:nth-of-type(6)'
      }
    }
  }
}

// statistics Info Pane Table
const statisticsInfoPaneTable = {
  root: 'div.table__item div.details-statistics div.details-statistics__table',
  header: {
    root: 'div.details-statistics__table-header',
    sorters: {
      name: 'div.statistics-cell_name div.data-ellipsis',
      count: 'div.statistics-cell_count div.data-ellipsis',
      mean: 'div.statistics-cell_mean div.data-ellipsis',
      std: 'div.statistics-cell_std div.data-ellipsis',
      min: 'div.statistics-cell_min div.data-ellipsis',
      max: 'div.statistics-cell_max div.data-ellipsis',
      unique: 'div.statistics-cell_unique div.data-ellipsis',
      top: 'div.statistics-cell_top div.data-ellipsis',
      Freq: 'div.statistics-cell_freq div.data-ellipsis',
      histogram: 'div.statistics-cell_histogram div.data-ellipsis'
    }
  },
  body: {
    root: 'div.details-statistics__table-body',
    row: {
      root: 'div.details-statistics__table-row',
      fields: {
        name: 'div.statistics-cell_name div.data-ellipsis',
        count: 'div.statistics-cell_count div.data-ellipsis',
        mean: 'div.statistics-cell_mean div.data-ellipsis',
        std: 'div.statistics-cell_std div.data-ellipsis',
        min: 'div.statistics-cell_min div.data-ellipsis',
        max: 'div.statistics-cell_max div.data-ellipsis',
        unique: 'div.statistics-cell_unique div.data-ellipsis',
        top: 'div.statistics-cell_top div.data-ellipsis',
        Freq: 'div.statistics-cell_freq div.data-ellipsis',
        histogram: 'div.statistics-cell_histogram div.data-ellipsis'
      }
    }
  }
}

// common components
const header = By.css('div.table__item div.item-header__data h3')
const updated = By.css('div.table__item div.item-header__data span')
const cancelButton = By.css(
  'div.table__item div.item-header__buttons > div.data-ellipsis:nth-of-type(1) button'
)
const applyChangesButton = By.css(
  'div.table__item div.item-header__buttons > div.data-ellipsis:nth-of-type(2) button'
)
const commonActionMenu = actionMenu(actionMenuStructure)
const crossCloseButton = By.css(
  'div.table__item div.item-header__buttons a div.data-ellipsis'
)
const commonInfoPaneTabSelector = commonTable(infoPaneTabSelector)

module.exports = {
  featureSetsInfoPane: {
    Header: header,
    Updated: updated,
    Cancel_Button: cancelButton,
    Apply_Changes_Button: applyChangesButton,
    Action_Menu: commonActionMenu,
    Cross_Close_Button: crossCloseButton,
    Info_Pane_Tab_Selector: commonInfoPaneTabSelector
  },
  featuresInfoPane: {
    Header: header,
    Updated: updated,
    Cancel_Button: cancelButton,
    Apply_Changes_Button: applyChangesButton,
    Action_Menu: commonActionMenu,
    Cross_Close_Button: crossCloseButton,
    Info_Pane_Tab_Selector: commonInfoPaneTabSelector,
    Features_Tab_Info_Pane_Table: commonTable(featuresInfoPaneTable)
  },
  transformationsInfoPane: {
    Header: header,
    Updated: updated,
    Cancel_Button: cancelButton,
    Apply_Changes_Button: applyChangesButton,
    Action_Menu: commonActionMenu,
    Cross_Close_Button: crossCloseButton,
    Info_Pane_Tab_Selector: commonInfoPaneTabSelector
  },
  previewInfoPane: {
    Header: header,
    Updated: updated,
    Cancel_Button: cancelButton,
    Apply_Changes_Button: applyChangesButton,
    Action_Menu: commonActionMenu,
    Cross_Close_Button: crossCloseButton,
    Info_Pane_Tab_Selector: commonInfoPaneTabSelector,
    Preview_Tab_Info_Pane_Table: commonTable(previewInfoPaneTable)
  },
  statisticsInfoPane: {
    Header: header,
    Updated: updated,
    Cancel_Button: cancelButton,
    Apply_Changes_Button: applyChangesButton,
    Action_Menu: commonActionMenu,
    Cross_Close_Button: crossCloseButton,
    Info_Pane_Tab_Selector: commonInfoPaneTabSelector,
    Statistics_Tab_Info_Pane_Table: commonTable(statisticsInfoPaneTable)
  },
  analysisInfoPane: {
    Header: header,
    Updated: updated,
    Cancel_Button: cancelButton,
    Apply_Changes_Button: applyChangesButton,
    Action_Menu: commonActionMenu,
    Cross_Close_Button: crossCloseButton,
    Info_Pane_Tab_Selector: commonInfoPaneTabSelector
  }
}
