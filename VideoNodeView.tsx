import { observer } from "mobx-react";
import * as React from 'react';
import { VideoNodeStore, NodeCollectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./VideoNodeView.scss";
import { ResizeArrow } from "../ResizeArrow";

interface VideoNodeProps {
    store: VideoNodeStore;
    nodeCollectionStore: NodeCollectionStore;
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node videoNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeArrow store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <video src={store.url} controls />
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