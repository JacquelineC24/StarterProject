import { observer} from "mobx-react";
import React, { createRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormattableTextNodeStore } from "../../../stores";
import "./RichTextEditor.scss";
import {observable, action} from "mobx";

/**
 * This file contains the RichTextEditor class which is a React component 
 * that utilizes and modifies the React Quill Rich Text Editor library
 */


/**\
 * This interface includes the props that need to be passed into 
 * the constructor of a RichTextEditor object upon creation.
 * The props inlcude the store, field in the store, initial text
 * to display, and the method to alter the text upon save. 
 */

interface RichTextEditorProps {
    store: FormattableTextNodeStore;
    field: keyof FormattableTextNodeStore;
    initialText: string;
}

@observer
export class RichTextEditor extends React.Component<RichTextEditorProps>{

    
    @observable private isEditing = false;
    //the currentText is set to observable to ensure that
    //a rerender occurs when this variable is changed
    @observable currentText = this.props.initialText;

    @observable private quillRef = createRef<ReactQuill>();

    /**
     * This function sets isEditing to true and the mouse cursor to the 
     * end of the line of text so that the user can begin editing the text.
     * This happens as a response to the text box being clicked on initially.
     * 
     * @param e 
     */
    @action
    startEditing = (e: React.MouseEvent): void => {
        this.isEditing = true;
        setTimeout(() => {
            const editor = this.quillRef.current?.getEditor();
            if (editor) {
                editor.focus();
                editor.setSelection(editor.getLength(), 0);
            }
        }, 0);
    };

    /**
     * Once the user clicks save, the new text is stored as 
     * the text in the field so that it is displayed on the 
     * node
     * 
     * @param e 
     */
    finishEditing = (e: React.MouseEvent): void => {
        const editor = this.quillRef.current?.getEditor();
        //hides the cursor so that the user does not still appear to be editing text
        editor?.blur();

        //sets isEditing to false so that text cannot still be edited
        this.isEditing = false;

        this.handleEdit(this.currentText);
    };

    //helper method that sets the current text to the new text and updates the field
    //in the formattableTextNodeStore
    handleEdit = (newText: string) => {
        this.currentText = newText;
        this.props.store.updateField(this.props.field, newText);
    }

    /**
     * highlights the text when the user clicks on it, allowing
     * the user to alter the text's state such as making it 
     * bold, underline, italic, etc.
     * 
     * @param e 
     */
    onPointerDown = (e: React.PointerEvent): void => {
                e.stopPropagation();
                e.preventDefault();

                const editor = this.quillRef.current?.getEditor();
                editor?.setSelection(0, editor.getLength(), 'user');
            }

    render (){

        return (
            <div className="editor" onPointerDown = {this.onPointerDown}>
                {this.isEditing ? (
                    <div>
                        <ReactQuill 
                            ref={this.quillRef}
                            value={this.currentText}
                            onChange={this.handleEdit}
                        />
                        <button onClick={this.finishEditing}>Save</button>
                    </div>
                ) : (
                    <div
                        onClick={this.startEditing}
                        style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px" }}
                    >
                    <div dangerouslySetInnerHTML={{__html: this.currentText}}></div>
                    </div>
                )}
            </div>
        );
    }
}