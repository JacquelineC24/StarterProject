import { action, computed, observable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website,
    FormatText,
    Collection,
}

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    //for scaling purposes
    @observable
    public newWidth: number = 0;

    @observable
    public width: number = 0;

    //for scaling purposes
    @observable
    public newHeight: number = 0;

    @observable
    public height: number = 0;

    //contains a list of nodes that the node is linked to
    @observable
    public links: NodeStore[] = [];

    @observable
    public static totalNodes: number = 0;

    //used to link and delete nodes
    @observable 
    public nodeNum: number = NodeStore.totalNodes;

    /**
     * this function takes in a node and adds it to the current
     * nodes list of links
     * 
     * @param node
     */
    @action
    public linkTo(node: NodeStore) {
        this.links.push(node);
    }

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }

    /**
     * This function utilizes the scale property to resize a node based on 
     * calculations with its previous and new width and height
     */
    @computed
    public get resize(): string {
        return "scale(" + this.newWidth/this.width + ", " + this.newHeight/this.height+ ")";
    } 
}