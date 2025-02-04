import { observer } from "mobx-react";
import * as React from 'react';
import { StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";
import "react-resizable/css/styles.css";
import { NodeCollectionStore } from "../../../stores";
import { ResizeArrow } from "../ResizeArrow";


interface TextNodeProps {
    store: StaticTextNodeStore;
    nodeCollectionStore: NodeCollectionStore;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {

    render() {

        let store = this.props.store;

        return (
            <div className="node textNode" style={{transform: store.transform + store.resize }} onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <TopBar store={store}/>
                <ResizeArrow store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <p className="paragraph">{store.text}</p>
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