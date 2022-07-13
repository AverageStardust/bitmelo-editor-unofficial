
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  ABOUT_TAB,
  PROJECT_TAB,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  SOUND_TAB,
  TILEMAP_TAB,
  INSTRUCTIONS_TAB,
} from '../../state/Layout/activeNavigationTab';
import { toggleNavigationPanel } from '../../state/Layout/navigationPanelIsOpen';
import { toggleReferencePanel } from '../../state/Layout/referencePanelIsOpen';

import TopBar from '../../components/TopBar/TopBar';
import Scrollbars from '../../components/Scrollbars/Scrollbars';
import AButton from '../../components/AButton/AButton';
import Icon from '../../components/Icon/Icon';

import About from '../About/About';
import ProjectEditor from '../ProjectEditor/ProjectEditor';
import Play from '../Play/Play';
import CodeEditor from '../CodeEditor/CodeEditor';
import TileEditor from '../TileEditor/TileEditor';
import TilemapEditor from '../TilemapEditor/TilemapEditor';
import SoundEditor from '../SoundEditor/SoundEditor';
import Instructions from '../Instructions/Instructions';

import TileEditorActionsButton from '../Actions/TileEditor/TileEditorActionsButton/TileEditorActionsButton';

import { eventMatchesHotkey, TOGGLE_NAVIGATION, TOGGLE_REFERENCE } from '../../utils/hotkeys';

import './MainContainer.css';

class MainContainer extends React.Component {
  constructor( props ) {
    super( props );

    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    const { anyModalIsOpen, _toggleNavigationPanel, _toggleReferencePanel } = this.props;

    if ( anyModalIsOpen ) {
      return;
    }

    if ( eventMatchesHotkey( event, TOGGLE_NAVIGATION ) ) {
      _toggleNavigationPanel();
      event.preventDefault();
    }

    if ( eventMatchesHotkey( event, TOGGLE_REFERENCE ) ) {
      _toggleReferencePanel();
      event.preventDefault();
    }
  }

  render() {
    const {
      activeNavigationTab,
      projectName,
    } = this.props;

    let contentRender = null;

    let topBarTitle = 'Bitmelo';

    let actionsButton = null;

    switch ( activeNavigationTab ) {
      case ABOUT_TAB: {
        contentRender = (
          <Scrollbars>
            <About />
          </Scrollbars>
        );
        topBarTitle += ': About';
        break;
      }
      case PROJECT_TAB:
        contentRender = (
          <Scrollbars>
            <ProjectEditor />
          </Scrollbars>
        );
        topBarTitle = `${ projectName }: Project`;
        break;
      case PLAY_TAB:
        contentRender = <Play />;
        topBarTitle = `${ projectName }: Play`;
        break;
      case CODE_TAB:
        contentRender = <CodeEditor />;
        topBarTitle = `${ projectName }: Code`;
        break;
      case TILE_TAB:
        contentRender = <TileEditor />;
        topBarTitle = `${ projectName }: Tile Editor`;
        actionsButton = <TileEditorActionsButton />;
        break;
      case TILEMAP_TAB:
        contentRender = <TilemapEditor />;
        topBarTitle = `${ projectName }: Tilemap Editor`;
        break;
      case SOUND_TAB:
        contentRender = (
          <Scrollbars>
            <SoundEditor />
          </Scrollbars>
        );
        topBarTitle = `${ projectName }: Sound Editor`;
        break;
      case INSTRUCTIONS_TAB: {
        contentRender = (
          <Scrollbars>
            <Instructions />
          </Scrollbars>
        );
        topBarTitle = `${ projectName }: Instructions`;
        break;
      }
      default:
        contentRender = (
          <Scrollbars>
            <ProjectEditor />
          </Scrollbars>
        );
        break;
    }

    const rightItemsRender = (
      <>
        { actionsButton }
      </>
    );

    const leftItemsRender = (
      <AButton
        className="explore-btn"
        href="https://bitmelo.com"
      >
        <Icon file="world" />
      </AButton>
    );

    return (
      <div className="main-container">
        <TopBar
          className="main-top-bar"
          title={ topBarTitle }
          leftItems={ leftItemsRender }
          rightItems={ rightItemsRender }
        />
        { contentRender }
      </div>
    );
  }
}

MainContainer.propTypes = {
  activeNavigationTab: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  _toggleNavigationPanel: PropTypes.func.isRequired,
  _toggleReferencePanel: PropTypes.func.isRequired,
  anyModalIsOpen: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectName: state.project.name,
    activeNavigationTab: state.layout.activeNavigationTab,
    anyModalIsOpen: state.layout.modalCount > 0,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleNavigationPanel: toggleNavigationPanel,
    _toggleReferencePanel: toggleReferencePanel,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MainContainer );
