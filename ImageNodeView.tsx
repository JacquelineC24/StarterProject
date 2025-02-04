import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./ImageNodeView.scss";
import { NodeCollectionStore } from "../../../stores";
import { ResizeArrow } from "../ResizeArrow";

/**
 * This file contains the ImageNodeView class which is a React component 
 * that contains the outline of an Image Node for the website
 */


/**\
 * This interface includes the props that need to be passed into 
 * the constructor of an ImageNodeView object upon creation.
 * The props are taken from the ImageNodeStore file. 
 */
interface ImageNodeProps {
    store: ImageNodeStore;
    nodeCollectionStore: NodeCollectionStore;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node imageNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeArrow store={store}/>
                <div className="scroll-box">
                    <div className="content">
                    <h3 className="title">{store.title}</h3>
                        <img src={store.url} alt={store.alt} />
                        {/* Allows the linked nodes to be rendered*/}
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