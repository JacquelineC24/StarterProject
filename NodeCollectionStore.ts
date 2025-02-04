import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }

    /**
     * This function deletes a node on the website by prompting a user with a pop up
     * that asks which node the user would like to delete. If the ndoe does not exist, 
     * a pop up tells the user this is the case. 
     * 
     * @returns nothing to exit the function if the node is null or the user does not
     * type in a node number
     */
    @action
    public deleteNode(): void {
        let node = prompt("Enter the number of the node you want to delete!:", "");
        if (this.nodes.length <= 0) {
            alert("There are no nodes to delete!");
        }

        if (node === null || node === "") {
            return; 
        } 
        else {
            //loops through each node in the collection and deletes the one
            //that is a match to the user's request
            for (let i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].nodeNum === +node) {
                    this.nodes.splice(i, 1);
                    return;
                }
            }
            if (+node-1 > this.nodes.length || +node-1 < 0) {
                alert("That node does not exist!");
    
            }
        }
    }

    /**
     * This function links two nodes together on the website by prompting the user with
     * a pop up that asks which two nodes the user would like to like. If the nodes do not
     * exist, a poop up will alert the user.
     * 
     * @returns nothing to exit the method if the user does not type in the 
     * correct amount of nodes or if the ndoes do not exist =
     */
    @action
    public linkNodes(): void {
        let nodes = prompt("Please enter nodes to link them together\nex: 1,2 with no spaces:", ""); 
        let checkExists: number = 0;

        if (this.nodes.length <= 0) {
            alert("There are no nodes to link!");
        }
        if (nodes === null || nodes === "" || nodes.length < 3) {
            return; 
        } 

        //retreives the numbers input by the user on the pop up
        let node1: number = +nodes?.split(',')[0];
        let node2: number = +nodes?.split(',')[1];
        //loops through the nodes in the collection to check if the nodes exist
        for(let i = 1; i < this.nodes.length; i++) {
            if (this.nodes[i].nodeNum === node1 || this.nodes[i].nodeNum === node2) {
                checkExists += 1;
            }
        }
        console.log(checkExists);
        if (checkExists !== 2) {
            alert("Make sure those nodes exist!");
            return;
        }
        //links the nodes to each other
        else {
            this.nodes[node1].linkTo(this.nodes[node2]);
            this.nodes[node2].linkTo(this.nodes[node1]);
        }
    }

    /**
     * This function moves the nodes into a horizontal line 
     * in the order that they were created
     */
    @action
    public lstView(): void {
        for (let i = 0; i < this.nodes.length; i++) {
             this.nodes[i].x = i;
             this.nodes[i].x *= 400;
             this.nodes[i].y = 0;
        }
    }

    /**
     * This function moves the free form canvas to the location
     * of a specific node on the canvas
     */
    @action
    public moveTo(xCoord: number, yCoord: number){
        this.x = xCoord;
        this.y = yCoord;
    }
}