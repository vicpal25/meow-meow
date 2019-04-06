import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Editor, EditorState, RichUtils} from 'draft-js';


const styles = theme => ({
      content: {
       height:'100%'
      },
  });
class EditorRow extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => this.setState({
            editorState
        });
        this.setEditor = (editor) => {
            this.editor = editor;
        };
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };
    }

    componentDidMount() {
        this.focusEditor();
      }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    _onItalicClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }

    render() {

    const { classes } = this.props;

    
    return (
      <div>

      <button onClick={this._onBoldClick.bind(this)}>Bold</button>
      <button onClick={this._onItalicClick.bind(this)}>Italic</button>

        <Editor
                className={classes.content}
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                placeholder="Enter some text..."
            />         
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EditorRow);
 