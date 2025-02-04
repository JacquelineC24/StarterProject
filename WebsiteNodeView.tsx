import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore, NodeCollectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./WebsiteNodeView.scss";
import { ResizeArrow } from "../ResizeArrow";

/**
 * This file contains the WebsiteNodeView class which is a React component 
 * that contains the outline of an Website Node for the website
 */


/**\
 * This interface includes the props that need to be passed into 
 * the constructor of an WebsiteNodeView object upon creation.
 * The props are taken from the WebsiteNodeStore file. 
 */
interface WebsiteNodeProps {
    store: WebsiteNodeStore;
    nodeCollectionStore: NodeCollectionStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    render() {
        let store = this.props.store;
        return (
            <div className="node websiteNode" style={{transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeArrow store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <iframe src={store.url}/>
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