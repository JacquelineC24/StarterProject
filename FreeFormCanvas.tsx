import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../stores";
import { NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore, ImageNodeStore, WebsiteNodeStore, FormattableTextNodeStore, CollectionNodeStore} from "../../stores";
import { TextNodeView, VideoNodeView, ImageNodeView, WebsiteNodeView, FormattableTextNodeView, CollectionNodeView} from "../nodes";
import "./FreeFormCanvas.scss";

interface FreeFormProps {
    store: NodeCollectionStore
}

let nodes: NodeStore[] = [];

@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
    
    /**
     * This function takes in a number to represent
     * the type of node that the user wants to create. The function
     * uses a switch statement that pushes the node type corresponding to the 
     * integer passed in as a parameter to the function.
     * 
     * @param nodeType 
     */
    handleClick(nodeType: number): void{
        NodeStore.totalNodes += 1;
        switch (nodeType){
            case 1:
                nodes.push(new StaticTextNodeStore({ type: StoreType.Text, x: 100, y: 100, title: "static Text Node Title, Node #" + NodeStore.totalNodes, text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
                break;
            case 2:
                nodes.push(new VideoNodeStore({ type: StoreType.Video, x: 100, y: 100, title: "Video Node Title, Node #" + NodeStore.totalNodes, url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
                break;
            case 3:
                nodes.push(new ImageNodeStore({ type: StoreType.Image, x: 100, y: 100, title: "Image Node Title, Node #" + NodeStore.totalNodes, url: "https://c.pxhere.com/photos/2d/f2/golden_retriever_puppy_happy_jumping_play_playful_dog_golden-1279753.jpg!d", alt: "Dog sitting in grass"}));
                break;
            case 4:
                nodes.push(new WebsiteNodeStore({ type: StoreType.Website, x: 100, y: 100, title: "Website Node Title, Node #" + NodeStore.totalNodes, url: "https://www.wikipedia.org/" }));
                break;
            case 5:
                nodes.push(new FormattableTextNodeStore({ type: StoreType.FormatText, x: 100, y: 100, title: "Formattable Text Node Title, Node #"+ NodeStore.totalNodes, text: "Click to edit this text"}));
                break;
            case 6:
                nodes.push(new CollectionNodeStore({ type: StoreType.Collection, x: 100, y: 100, title: "Collection, Node #" + NodeStore.totalNodes}));
                break;
            default:
                console.log("invalid");
            }
        this.props.store.addNodes(nodes);
    }

    private isPointerDown: boolean | undefined;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return;

        this.props.store.x += e.movementX;
        this.props.store.y += e.movementY;
    }

    render() {
        let store = this.props.store;
        return (
            <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
                <div className="freeformcanvas" style={{ transform: store.transform }}>
                    {   
                        // maps each item in the store to be rendered in the canvas based on the node type
                        store.nodes.map(nodeStore => {
                            switch (nodeStore.type) {
                                case StoreType.Text:
                                    return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} nodeCollectionStore={store}/>)

                                case StoreType.Video:
                                    return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} nodeCollectionStore={store}/>)
                                
                                case StoreType.Image:
                                    return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} nodeCollectionStore={store}/>)

                                case StoreType.Website:
                                    return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as WebsiteNodeStore} nodeCollectionStore={store}/>)

                                case StoreType.FormatText:
                                    return (<FormattableTextNodeView key={nodeStore.Id} store={nodeStore as FormattableTextNodeStore} nodeCollectionStore={store}/>)

                                case StoreType.Collection:
                                    return (<CollectionNodeView key={nodeStore.Id} store={nodeStore as CollectionNodeStore} nodeCollectionStore={store}/>)

                                default:
                                    return (null);
                            }
                        })
                    }
                </div>

                {/* This creates the buttons for adding new nodes, linking nodes, and deleting nodes.
                These buttons are displayed at the top of the screen*/}
                <button className = "button" onClick = {() => this.handleClick(1)}> Add Text Node </button>
                <button className = "button" onClick = {() => this.handleClick(2)}> Add Video Node </button>
                <button className = "button" onClick = {() => this.handleClick(3)}> Add Image Node </button>
                <button className = "button" onClick = {() => this.handleClick(4)}> Add Website Node </button>
                <button className = "button" onClick = {() => this.handleClick(5)}> Add Format Text Node </button>
                <button className = "button" onClick = {() => this.handleClick(6)}> Add Collection </button>
                <button className = "button" onClick = {() => store.linkNodes()}> Link Nodes </button>
                <button className = "button" onClick = {() => store.lstView()}> View Nodes Sequentially </button>
                <button className = "button" onClick = {() => store.deleteNode()}> Delete Node </button>
            </div>
        );
    }
}
