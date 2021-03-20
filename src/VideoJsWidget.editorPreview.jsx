import { Component, createElement } from "react";

import { parseInlineStyle } from "@mendix/pluggable-widgets-tools";

import { VideoJS } from "./components/VideoJS";

export class preview extends Component {
    render() {
        return (
            <div ref={this.parentInline}>
                <VideoJS {...this.transformProps(this.props)}></VideoJS>
            </div>
        );
    }

    parentInline(node) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "inline-block";
        }
    }

    transformProps(props) {
        return {
            type: props.videojswidgetType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: parseInlineStyle(props.style),
            defaultValue: props.videojswidgetValue ? props.videojswidgetValue : "",
            value: props.valueAttribute
        };
    }
}

export function getPreviewCss() {
    return require("./ui/VideoJsWidget.css");
}
