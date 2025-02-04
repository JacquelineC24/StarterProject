import { observer } from "mobx-react";
import * as React from 'react';
import { FormattableTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./FormattableTextNodeView.scss";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import { NodeCollectionStore } from "../../../stores";
import { ResizeArrow } from "../ResizeArrow";

/**
 * This file contains the FormattableTextNodeView class which is a React component 
 * that contains the outline of a Node for the website that contains text that can 
 * be altered by the user
 */


/**\
 * This interface includes the props that need to be passed into 
 * the constructor of a FormattableTextNodeView object upon creation.
 * The props are taken from the FormattableTextNodeStore file. 
 */
interface FormattableTextNodeProps {
    store: FormattableTextNodeStore;
    nodeCollectionStore: NodeCollectionStore;
}

@observer
export class FormattableTextNodeView extends React.Component<FormattableTextNodeProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node formatTextNode" style={{ transform: store.transform + store.resize}}
             onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <TopBar store={store}/>
                <ResizeArrow store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        {/*a RichTextEditor component from the RichTextEditor 
                        class I created is established here for both the title 
                        and text fields.*/}
                        <RichTextEditor 
                            store={store} 
                            field="title" 
                            initialText={store.title} 
                        />
                        <RichTextEditor 
                            store={store} 
                            field="text" 
                            initialText={store.text} 
                        />
                        <div className="linkedNodes">
                            {store.links.map((node, index) => (
                                <div key = {index} className="linkedNode" onClick=
                                {() => this.props.nodeCollectionStore.moveTo(node.x, node.y)}>
                                    link for node {node.nodeNum}
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}