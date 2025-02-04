import { observer } from 'mobx-react';
import * as React from 'react';
import { NodeStore } from '../../../stores';
import "./ResizeArrow.scss";
import {action} from "mobx";

/**
 * This file contains the ResizeArrow class which is a React component 
 * that contains the outline of the resizeArrow that can be added to
 * any node to make it resizeable
 */


/**\
 * This interface includes the props that need to be passed into 
 * the constructor of a resizeArrow object upon creation
 */
interface ResizeArrowProps {
    store: NodeStore;
}

@observer
export class ResizeArrow extends React.Component<ResizeArrowProps> {

    private isResizing = false;
    
        /**
         * prevents the normal movement of the freeFormCanvas when the resizeArrow
         * is clicked on.
         * Also sets isResizing to true so that the resizing can occur.
         * 
         * @param e 
         */
        onPointerDown = (e: React.PointerEvent): void => {
            e.stopPropagation();
            e.preventDefault();
            this.isResizing = true;
    
            document.removeEventListener("pointermove", this.onPointerMove);
            document.removeEventListener("pointerup", this.onPointerUp);
            document.addEventListener("pointermove", this.onPointerMove);
            document.addEventListener("pointerup", this.onPointerUp);
        }
    
        /**
         * returns the normal movement of the freeFormCanvas once the mouse click
         * is lifted. sets isResizing to false so that the node can no longer change size.
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
         * Alters the stored width, height, newWidth, and newHeight properties of the node 
         * while the mouse moves and isresizing is true.
         * 
         * @param e 
         * @returns 
         */
        @action
        onPointerMove = (e: PointerEvent): void => {
            e.stopPropagation();
            e.preventDefault();
            if (!this.isResizing) return;

            this.props.store.width = 300;
            this.props.store.height = 300;

            this.props.store.newWidth += 1 * e.movementX;
            this.props.store.newHeight += 1 * e.movementY;
        }

        render() {
            return (
                <div className = "resize" onPointerDown = {this.onPointerDown}/>
            );
        }
}