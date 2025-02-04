import { observer } from "mobx-react";
import * as React from 'react';
import { CollectionNodeStore, NodeCollectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./CollectionNodeView.scss";
import { action, observable } from "mobx";

/**
 * This file contains the CollectionNodeView class which is a React component 
 * that contains the outline of a Collection on the website.
 * A collection is basically a node that contains nodes within it.
 */


/**\
 * This interface includes the props that need to be passed into 
 * the constructor of a CpllectionNodeView object upon creation.
 * The props are taken from the CollectionNodeStore file. 
 */
interface CollectionNodeProps {
    store: CollectionNodeStore;
    nodeCollectionStore: NodeCollectionStore;
}

@observer
export class CollectionNodeView extends React.Component<CollectionNodeProps> {

    /**
     * I chose to use a different method for resizing collections than the 
     * other nodes because I thought it would be best if the collection is 
     * actually resized so that you can see all of its individual nodes rather
     * than simply being scaled. 
     */

    @observable width = 300;
    @observable height = 300;
    
    private isResizing = false; 
    
    /**
     * prevents the freeformcanvas from moving when the collection is clicked
     * 
     * @param e 
     */
    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isResizing = true;
    
        document.addEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointerup", this.onPointerUp);
    }
    
    /**
     * returns the normal mouse click function once the user lifts their click
     * 
     * @param e 
     */
    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isResizing = false;
    
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }
    
    /**
     * changes the collection's width and height 
     * property while the mouse is being moved
     * 
     * @param e 
     * @returns 
     */
    @action
    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isResizing) return;
        
        this.width = this.width + e.movementX;
        this.height = this.height + e.movementX;
    }

    render() {

        const width = this.width;
        const height = this.height;
        let store = this.props.store;

        return (
            <div onPointerDown={this.onPointerDown} className="node collectionNode" 
            style={{width: `${width}px`, height: `${height}px`, transform: store.transform}}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <iframe src={"google.com"}/>
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